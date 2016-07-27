import { Mongo } from 'meteor/mongo';

psicoRequest = new Mongo.Collection('psicoRequest');
psicoDatabase = new Mongo.Collection('psicoDatabase');

contactsSchema = new SimpleSchema({
    email: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    phone: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    facebook: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    instagram: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    twitter: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    website: {
        type: String,
        optional: true,
        defaultValue: ""
    }
});

addressGeocodeSchema = new SimpleSchema({
    lat:{
        type: Number,
        decimal: true,
        optional: true
    },
    lng:{
        type: Number,
        decimal: true,
        optional: true
    },
    address:{
        type: String,
        optional: true
    },
    zipcode:{
        type: String,
        optional: true
    },
    city:{
        type: String,
        optional: true
    }
});

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
        label: "User Address",
        optional: true
    },
    addressGeocode:{
        type: addressGeocodeSchema,
        label: "Geocoded Address",
        optional: true
    },
    phone:{
        type: String,
        label: "User Phone",
        optional: true
    },
    valoresRange: {
        type: String,
        optional: true
    },
    atendimentoType:{
        type: String,
        optional: true
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
    discountCode: {
        type: String,
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

psicoSchema = new SimpleSchema({
    name:{
        type: String,
        optional: true
    },
    crp: {
        type: String,
        optional: true
    },
    servicoType: {
        type: String,
        optional: true
    },
    abordagemType: {
        type: String,
        optional: true
    },
    addressGeocode:{
        type: addressGeocodeSchema,
        optional: true
    },
    contacts: {
        type: contactsSchema,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    convenio: {
        type: String,
        optional: true
    }
})

psicoRequest.attachSchema(psicoRequestSchema);
psicoDatabase.attachSchema(psicoSchema);

