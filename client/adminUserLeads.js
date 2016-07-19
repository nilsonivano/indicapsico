import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.adminUserLeads.onCreated(function(){
    GoogleMaps.load({ v: '3', key: 'AIzaSyBqVt5eVYugh9bvX4XTseye8RuSrdPHdmE', libraries: 'geometry,places' });
})

Template.adminUserLeads.onRendered(function(){
    GoogleMaps.ready('mapUserLeads', function() {
        var map = GoogleMaps.maps.mapUserLeads.instance;
        var userLeads = psicoRequest.find().fetch();
        var psicoList = psicoDatabase.find().fetch();
        var iconLeads ='/img/markerIndicaPsicoLead.png';
        var iconPsico ='/img/markerIndicaPsico20.png';
        placeMarkerLead(userLeads,map,iconLeads, psicoList);
        placeMarkerPsico(psicoList,map,iconPsico);
    });
})

Template.adminUserLeads.helpers({
    userLeads: function () {
        return psicoRequest.find();
    },
    leadCount: function () {
        return psicoRequest.find().count();
    },
    psicoCount: function () {
        return psicoDatabase.find().count();
    },
    mapUserLeads: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            };
        }
    },
    userNearPsicosInfo: function () {
        return Session.get('userNearPsicosInfo')
    }
})