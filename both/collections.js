import { Mongo } from 'meteor/mongo';

psicoRequest = new Mongo.Collection('psicoRequest');

psicoRequestSchema = new SimpleSchema({
    name: {
        type: String,
        label: "User Name"

    },
    email:{
        type: String,
        label: "User email"

    },
    address: {
        type: String,
        label: "User Address"
    },
    phone:{
        type: String,
        label: "User Phone"
    },
    valoresRange: {
        type: String
    },
    atendimentoType:{
        type: String
    },
    especializacaoType:{
        type: String,
        optional: true
    },
    abordagemType:{
        type: String,
        optional: true
    },
    haveConvenio: {
        type: Boolean
    },
    convenioName: {
        type: String,
        optional: true
    },
    haveContatar: {
        type: Boolean
    },
    contatoHorario: {
        type: [String],
        optional: true
    },
    contatoType: {
        type: [String],
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
});

psicoRequest.attachSchema(psicoRequestSchema);

