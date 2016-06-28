import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'insertRequestPsico': function(name, email, phone, address, valores, atendimentoType, especializacaoType, abordagemType,
    haveConvenio, nomeConvenio, haveContatar, contatoList, periodoList){
        psicoRequest.insert({
            name: name,
            email: email,
            phone: phone,
            address: address,
            valoresRange: valores,
            atendimentoType: atendimentoType,
            especializacaoType: especializacaoType,
            abordagemType: abordagemType,
            haveConvenio: haveConvenio,
            convenioName: nomeConvenio,
            haveContatar: haveContatar,
            contatoHorario: periodoList,
            contatoType: contatoList
        });
    }
});