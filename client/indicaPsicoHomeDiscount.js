import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.indicaPsicoHomeDiscount.onRendered(function () {
    $('.parallax').parallax();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('.scrollspy').scrollSpy();
    Tracker.autorun(function () {
        perc = Session.get("scrollPercentage");
        ga('send', 'event', {
            eventCategory: 'SiteTracking',
            eventAction: 'userScrollPage',
            eventValue: perc
        });
    });
});