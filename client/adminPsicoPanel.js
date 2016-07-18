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
                if(csvdata){
                    console.log(csvdata);
                    for(data of csvdata){
                        var psicoObject = {
                            name: data.name,
                            crp: data.crp,
                            servicoType: data.serviceType,
                            abordagemType: data.abordagemType,
                            addressGeocode:{
                                lat: data.lat,
                                lng: data.lng,
                                address: data.addressOtimizado
                            },
                            contacts:{
                                phone: data.phone,
                                website: data.website,
                                email: data.email
                            },
                            convenio: data.convenio
                        };
                        console.log(psicoObject);
                        Meteor.call("insertPsicoDatabase", psicoObject , function (error, result) {
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
