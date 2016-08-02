import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';


Template.adminPsicoPanel.onRendered(function () {
});

Template.adminPsicoPanel.events({
    'change [name="uploadCSV"]' (event, template) {
        Papa.parse(event.target.files[0], {
            header: true,
            complete(results, file) {
                var csvdata = results.data;
                if (csvdata) {
                    console.log(csvdata);
                    for (data of csvdata) {
                        // split String if needed
                        var abordagem = data.typeAbordagem;
                        var especializacao = data.typeSpecialization;
                        var convenio = data.convenio;
                        var divulgacao = data.divulgacao;
                        var atendimento = data.typeAtendimento;
                        var abordagemSplit = abordagem.split(",").filter(Boolean);
                        var especializacaoSplit = especializacao.split(",").filter(Boolean);
                        var convenioSplit = convenio.split(",").filter(Boolean);
                        var divulgacaoSplit = divulgacao.split(",").filter(Boolean);
                        var atendimentoSplit = atendimento.split(",").filter(Boolean);

                        var psicoObject = {
                            name: data.name,
                            crp: data.crp,
                            typeAtendimento: atendimentoSplit,
                            typeAbordagem: abordagemSplit,
                            typeSpecialization: especializacaoSplit,
                            addressGeocode: {
                                lat: data.lat,
                                lng: data.lng,
                                address: data.addressOtimizado
                            },
                            contacts: {
                                phone: data.phone,
                                website: data.website,
                                email: data.email
                            },
                            convenio: convenioSplit,
                            divulgacao: divulgacaoSplit,
                            priceRange: data.priceRange
                        };
                        console.log(psicoObject);
                        Meteor.call("insertPsicoDatabase", psicoObject, function (error, result) {
                            if (error) {
                                console.log("error", error);
                            }
                            if (result) {
                                console.log(result)
                            }
                        });
                    }
                }
            }
        });
    }
});

Template.adminPsicoPanel.helpers({
    csvresults: function () {
        return Session.get('csvdata');
    }
});
