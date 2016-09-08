Template.main2.helpers({
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

Template.main2.events({
    'click #convenioSim': function () {
        $("#convenioSim").toggleClass("active");
        $("#convenioNao").removeClass("active");
        if ($("#nomeConvenio").hasClass("disabled")) {
            $("#nomeConvenio").toggleClass("disabled")
        }
    },
    'click #convenioNao': function () {
        $("#convenioNao").toggleClass("active");
        $("#convenioSim").removeClass("active");
        if (!$("#nomeConvenio").hasClass("disabled")) {
            $("#nomeConvenio").toggleClass("disabled")
        }
    },
    'click #buttonIndicaPsico': function () {
        ga('send', 'event', {
            eventCategory: 'SiteTracking',
            eventAction: 'buttonIndicaProfissionaisClick'
        });
    },
    'click #contatoEmail': function () {
        $('#contatoEmail').toggleClass('active')
    },
    'click #contatoWhatsapp': function () {
        $('#contatoWhatsapp').toggleClass('active')
    },
    'click #contatoTelefone': function () {
        $('#contatoTelefone').toggleClass('active')
    },
    'click #contatoManha': function () {
        $('#contatoManha').toggleClass('active')
    },
    'click #contatoTarde': function () {
        $('#contatoTarde').toggleClass('active')
    },
    'click #contatoAlmoco': function () {
        $('#contatoAlmoco').toggleClass('active')
    },
    'click #contatoNoite': function () {
        $('#contatoNoite').toggleClass('active')
    },
    'click #requisitaPsico': function (event) {
        event.preventDefault();
        $('#requisitaPsico').addClass('loading');
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var valores = $('#valores').find('.active').attr('data-value');
        var atendimentoType = $('#atendimentoType').find('.active').attr('data-value');
        var especializacaoType = $('#especializacaoType').find('.active').attr('data-value');
        var abordagemType = $('#abordagemType').find('.active').attr('data-value');
        var haveConvenio = $('#haveConvenio').find('.active').html();
        var nomeConvenio = "";
        if (haveConvenio == "Sim") {
            haveConvenio = true;
            nomeConvenio = $('#convenio').val();
        } else {
            haveConvenio = false;
        }
        var haveContatar = true;
        var tipoContato = [];
        var tipoContatoJquery = $('#tipoContato').find('.active').each(function () {
            tipoContato.push($(this).html())
        });
        var periodoContato = [];
        var periodoContatoJquery = $('#periodoContato').find('.active').each(function () {
            periodoContato.push($(this).html())
        });
        console.log(tipoContato, periodoContato);
        if (name && email && address && valores) {
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
                        haveConvenio, nomeConvenio, haveContatar, tipoContato, periodoContato, discountCode, function (err, results) {
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
                                        'Seu código para utilizar os 50% de desconto em seu primeiro mês de tratamento é ' + '<b>' + discountCode + '</b>' + '. Utilize este código em sua primeira consulta com o profissional que iremos indicar. ' +
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
                                        '<div>' + '<b>Tipo de Contato: </b>' + tipoContato + '<div>' +
                                        '<div>' + '<b>Período de Contato: </b>' + periodoContato + '<div>' +
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
                                        '<div>' + '<b>Tipo de Contato: </b>' + tipoContato + '<div>' +
                                        '<div>' + '<b>Período de Contato: </b>' + periodoContato + '<div>' +
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
                                '<div>' + '<b>Tipo de Contato: </b>' + tipoContato + '<div>' +
                                '<div>' + '<b>Período de Contato: </b>' + periodoContato + '<div>';
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
                            $('#requisitaPsico').removeClass('loading');
                            toastr.success('Sua requisição foi enviada com sucesso. Em breve um de nossos psicólogos entrará em contato')
                            window.google_trackConversion({
                                google_conversion_id: 972021336,
                                google_conversion_language: "en",
                                google_conversion_format: "3",
                                google_conversion_color: "ffffff",
                                google_conversion_label: "gkR8CKCSlGgQ2Ly_zwM",
                                google_remarketing_only: false
                            });
                            $("#indicaForm").find('input:text, input:password, input:file, select, textarea').val('');
                        });
                } else {
                    toastr.error('CEP ou Bairro Inválido');
                    $('#requisitaPsico').removeClass('loading');
                }
            })
        } else {
            toastr.error('Por favor preencha todos os campos obrigatórios.');
            $('#requisitaPsico').removeClass('loading');
            ga('send', 'event', {
                eventCategory: 'SiteTracking',
                eventAction: 'buttonRequestPsicoClick',
                eventLabel: 'Falta Campos Obrigatorios'
            });
        }
    }


});

Template.main2.onCreated(function () {
    //add your statement here
});

Template.main2.onRendered(function () {
    $('.ui.dropdown').dropdown();
    $('#buttonBuscarProfissionais').click(function () {
        var scrollTo = $('#form');
        var container = $('body');
        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        });
    });
});

Template.main2.onDestroyed(function () {
    //add your statement here
});

