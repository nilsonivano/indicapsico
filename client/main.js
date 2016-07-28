import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import './main.html';

Template.indicaPsicoHome.onRendered(function () {
    $('.parallax').parallax();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('.scrollspy').scrollSpy();
    Tracker.autorun(function () {
        perc = Session.get("scrollPercentage");
        ga('send', 'event', {
            eventCategory: 'SiteTracking',
            eventAction: 'userScrollPage',
            eventValue: perc
        });
    });
});

Template.indicaForm.helpers({
    atendimentoTypes: function () {
        return atendimentoTypes
    },
    especializacaoTypes: function () {
        return especializacaoTypes
    },
    abordagemTypes: function () {
        return abordagemTypes
    },
    valores: function () {
        return valores
    }
});

Template.indicaForm.events({
    'click #convenioSim': function () {
        if ($("#nomeConvenio").attr("disabled")) {
            $("#nomeConvenio").attr("disabled", false)
        }
    },
    'click #convenioNao': function () {
        if (!$("#nomeConvenio").attr("disabled")) {
            $("#nomeConvenio").attr("disabled", true)
        }
    },
    'click #contatoSim': function () {
        $('#contatoForm').show();
    },
    'click #contatoNao': function () {
        $('#contatoForm').hide();
    },
    'click #buttonIndicaPsico': function () {
        ga('send', 'event', {
            eventCategory: 'SiteTracking',
            eventAction: 'buttonIndicaProfissionaisClick'
        });
    },
    'click #requisitaPsico': function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        console.log(address);
        var valores = $('#valores').val();
        var atendimentoType = $('#atendimentoType').val();
        var especializacaoType = $('#especializacaoType').val();
        var abordagemType = $('#abordagemType').val();
        var checkConvenio = $('input[name="convenioGroup"]:checked').val();
        var haveConvenio = $('input[name="convenioGroup"]:checked').val();
        if (haveConvenio == "convenioSim") {
            haveConvenio = true;
        } else {
            haveConvenio = false;
        }
        var nomeConvenio = $('#nomeConvenio').val();
        var haveContatar = true;
        var tipoContato = $('input[name=tipoContato]:checked');
        var contatoList = [];
        if (tipoContato) {
            for (i = 0; i < tipoContato.length; i++) {
                var contato = tipoContato[i].value;
                contatoList.push(contato);
            }
        }
        var periodoContato = $('input[name=periodoContato]:checked');
        var periodoList = [];
        if (periodoContato) {
            for (i = 0; i < periodoContato.length; i++) {
                var periodo = periodoContato[i].value;
                periodoList.push(periodo);
            }
        }
        if (name && email && address && valores && checkConvenio) {
            //Test Regex (Zipcode or Bairro)
            var zipcodeRegex1 = /^[0-9]{5}-[0-9]{3}$/;
            var zipcodeRegex2 = /^[0-9]{8}$/;
            if (zipcodeRegex1.test(address) || zipcodeRegex2.test(address)) {
                addressType = 'zipcode'
            } else {
                addressType = 'bairro'
            }
            switch (addressType) {
                case 'zipcode':
                    break;
                case 'bairro':
                    address = address + ' São Paulo'
                    break
            }
            console.log(addressType);
            Meteor.call('getGeocodeFromAddress', address, function (err, res) {
                if (res) {
                    var addressGeocode = {
                        lat: res[0].latitude,
                        lng: res[0].longitude,
                        city: res[0].city,
                        zipcode: res[0].zipcode,
                        address: res[0].formattedAddress,
                    };

                    var path = Router.current().route.path();
                    var discountCode = "";
                    if (path == "/discount") {
                        var random = Math.random().toString(36).substring(7);
                        discountCode = 'IP' + random;
                    }
                    console.log(discountCode);
                    Meteor.call('insertRequestPsico', name, email, phone, address, addressGeocode, valores, atendimentoType, especializacaoType, abordagemType,
                        haveConvenio, nomeConvenio, haveContatar, contatoList, periodoList, discountCode, function (err, results) {
                            if (err) {
                                console.log(err)
                            } else {
                                if (haveConvenio == true) {
                                    haveConvenio = "Sim"
                                } else {
                                    haveConvenio = "Não"
                                }
                                if (haveContatar == true) {
                                    haveContatar = "Sim"
                                } else {
                                    haveContatar = "Não"
                                }
                                //Sending emails
                                if (discountCode.length > 1) {
                                    var html =
                                        '<div>' + 'Olá ' + name + ', sua proposta foi enviada ao IndicaPsico. ' +
                                        'Seu código para utilizar os 50% de desconto em sua primeira consulta é ' + '<b>' + discountCode + '</b>' + '. Utilize este código em sua primeira consulta com o profissional que iremos indicar. ' +
                                        ' Pedimos agora que aguarde o nosso contato com a sugestão de psicólogos conforme sua necessidade. Abaixo você pode revisar as informações que você enviou:' + '</div>' +
                                        '</br>' +
                                        '<div>' + '<b>Nome: </b>' + name + '</div>' +
                                        '<div>' + '<b>Email: </b>' + email + '</div>' +
                                        '<div>' + '<b>Telefone: </b>' + phone + '<div>' +
                                        '<div>' + '<b>Endereço: </b>' + address + '<div>' +
                                        '<div>' + '<b>Valor: </b>' + valores + '<div>' +
                                        '<div>' + '<b>Tipo de atendimento: </b>' + atendimentoType + '<div>' +
                                        '<div>' + '<b>Tipo de especialização: </b>' + especializacaoType + '<div>' +
                                        '<div>' + '<b>Tipo de abordagem: </b>' + abordagemType + '<div>' +
                                        '<div>' + '<b>Convênio: </b>' + haveConvenio + '<div>' +
                                        '<div>' + '<b>Nome do Convênio: </b>' + nomeConvenio + '<div>' +
                                        '<div>' + '<b>Contatar: </b>' + haveContatar + '<div>' +
                                        '<div>' + '<b>Tipo de Contato: </b>' + contatoList + '<div>' +
                                        '<div>' + '<b>Período de Contato: </b>' + periodoList + '<div>' +
                                        '</br>' +
                                        '<div>' + 'Obrigado por utilizar o IndicaPsico (www.indicapsico.com.br)' + '</div>';
                                } else {
                                    var html =
                                        '<div>' + 'Olá ' + name + ', sua proposta foi enviada ao IndicaPsico' +
                                        ' Pedimos agora que aguarde o nosso contato com a sugestão de psicólogos conforme sua necessidade. Abaixo você pode revisar as informações que você enviou:' + '</div>' +
                                        '</br>' +
                                        '<div>' + '<b>Nome: </b>' + name + '</div>' +
                                        '<div>' + '<b>Email: </b>' + email + '</div>' +
                                        '<div>' + '<b>Telefone: </b>' + phone + '<div>' +
                                        '<div>' + '<b>Endereço: </b>' + address + '<div>' +
                                        '<div>' + '<b>Valor: </b>' + valores + '<div>' +
                                        '<div>' + '<b>Tipo de atendimento: </b>' + atendimentoType + '<div>' +
                                        '<div>' + '<b>Tipo de especialização: </b>' + especializacaoType + '<div>' +
                                        '<div>' + '<b>Tipo de abordagem: </b>' + abordagemType + '<div>' +
                                        '<div>' + '<b>Convênio: </b>' + haveConvenio + '<div>' +
                                        '<div>' + '<b>Nome do Convênio: </b>' + nomeConvenio + '<div>' +
                                        '<div>' + '<b>Contatar: </b>' + haveContatar + '<div>' +
                                        '<div>' + '<b>Tipo de Contato: </b>' + contatoList + '<div>' +
                                        '<div>' + '<b>Período de Contato: </b>' + periodoList + '<div>' +
                                        '</br>' +
                                        '<div>' + 'Obrigado por utilizar o IndicaPsico (www.indicapsico.com.br)' + '</div>';
                                }
                                Meteor.call('sendEmail',
                                    email,
                                    'contato@indicapsico.com.br',
                                    'Sua requisição foi enviada com sucesso para o IndicaPsico',
                                    html,
                                    function (err, results) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    });
                            }
                            var htmlIndicaPsico =
                                '<div>' + 'Nova requisição no IndicaPsico' + '</div>' +
                                '</br>' +
                                '<div>' + '<b>Nome: </b>' + name + '</div>' +
                                '<div>' + '<b>Email: </b>' + email + '</div>' +
                                '<div>' + '<b>Telefone: </b>' + phone + '<div>' +
                                '<div>' + '<b>Endereço: </b>' + address + '<div>' +
                                '<div>' + '<b>Valor: </b>' + valores + '<div>' +
                                '<div>' + '<b>Tipo de atendimento: </b>' + atendimentoType + '<div>' +
                                '<div>' + '<b>Tipo de especialização: </b>' + especializacaoType + '<div>' +
                                '<div>' + '<b>Tipo de abordagem: </b>' + abordagemType + '<div>' +
                                '<div>' + '<b>Convênio: </b>' + haveConvenio + '<div>' +
                                '<div>' + '<b>Nome do Convênio: </b>' + nomeConvenio + '<div>' +
                                '<div>' + '<b>Contatar: </b>' + haveContatar + '<div>' +
                                '<div>' + '<b>Tipo de Contato: </b>' + contatoList + '<div>' +
                                '<div>' + '<b>Período de Contato: </b>' + periodoList + '<div>';
                            Meteor.call('sendEmail',
                                'contato@indicapsico.com.br',
                                'contato@indicapsico.com.br',
                                'Nova requisição IndicaPsico',
                                htmlIndicaPsico,
                                function (err, results) {
                                    if (err) {
                                        Materialize.toast('Sua requisição não foi enviada. Ocorreu algum erro no envio.', 10000);
                                        ga('send', 'event', {
                                            eventCategory: 'SiteTracking',
                                            eventAction: 'buttonRequestPsicoClick',
                                            eventLabel: 'Erro'
                                        });
                                    }
                                });
                            ga('send', 'event', {
                                eventCategory: 'SiteTracking',
                                eventAction: 'buttonRequestPsicoClick',
                                eventLabel: 'Envio com sucesso'
                            });
                            window.google_trackConversion({
                                google_conversion_id: 972021336,
                                google_conversion_language: "en",
                                google_conversion_format: "3",
                                google_conversion_color: "ffffff",
                                google_conversion_label: "gkR8CKCSlGgQ2Ly_zwM",
                                google_remarketing_only: false
                            });
                            $("#modalRequestPsicoSuccess").openModal();
                            $("#indicaForm").find('input:text, input:password, input:file, select, textarea').val('');
                            $("#indicaForm").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
                        });
                } else {
                    Materialize.toast('CEP ou Bairro Inválido', 5000);
                }
            })
        } else {
            Materialize.toast('Por favor preencha todos os campos obrigatórios.', 5000);
            ga('send', 'event', {
                eventCategory: 'SiteTracking',
                eventAction: 'buttonRequestPsicoClick',
                eventLabel: 'Falta Campos Obrigatorios'
            });
        }
    }
});