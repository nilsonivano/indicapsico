import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);
Houston.add_collection(psicoRequest);