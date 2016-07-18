Meteor.publish('userLeadsAll', function(){
    return psicoRequest.find()
});

Meteor.publish("psicoDatabaseAll", function () {
    return psicoDatabase.find()
});