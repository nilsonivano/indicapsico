import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'insertRequestPsico': function(name, email, phone, address, addressGeocode, valores, atendimentoType, especializacaoType, abordagemType,
    haveConvenio, nomeConvenio, haveContatar, contatoList, periodoList, discountCode){
        psicoRequest.insert({
            name: name,
            email: email,
            phone: phone,
            address: address,
            addressGeocode:{
                lat: addressGeocode.lat,
                lng: addressGeocode.lng,
                city: addressGeocode.city,
                zipcode: addressGeocode.zipcode,
                address: addressGeocode.address
            },
            valoresRange: valores,
            atendimentoType: atendimentoType,
            especializacaoType: especializacaoType,
            abordagemType: abordagemType,
            haveConvenio: haveConvenio,
            convenioName: nomeConvenio,
            haveContatar: haveContatar,
            contatoHorario: periodoList,
            contatoType: contatoList,
            discountCode: discountCode
        });
    },
    'getGeocodeFromAddress': function(address){
        var geo = new GeoCoder({
            geocoderProvider: "google",
            httpAdapter: "https",
        });
        var result = geo.geocode(address);
        if(result){
            return result
        } else{
            return "Achei nada...."
        }
    },
    'insertPsicoDatabase': function (psicoObject) {
        check(psicoObject, Object);
        return(psicoDatabase.insert({
            name: psicoObject.name,
            crp: psicoObject.crp,
            servicoType: psicoObject.servicoType,
            abordagemType: psicoObject.abordagemType,
            addressGeocode:{
                lat: psicoObject.addressGeocode.lat,
                lng: psicoObject.addressGeocode.lng,
                address: psicoObject.addressGeocode.address
            },
            contacts:{
                phone: psicoObject.contacts.phone,
                website: psicoObject.contacts.website,
                email: psicoObject.contacts.email
            },
            convenio: psicoObject.convenio
        })
        )
    }
});