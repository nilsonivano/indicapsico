Meteor.startup(function () {
    $(window).scroll(function () {
        windowPosition = $(window).scrollTop() + $(window).height();
        perc = windowPosition / $(document).height() * 100;
        if (perc > 25 && perc < 50) {
            Session.set("scrollPercentage", 25);
        }
        if (perc > 50 && perc < 75) {
            Session.set("scrollPercentage", 50);
        }
        if (perc > 75 && perc < 99) {
            Session.set("scrollPercentage", 75);
        }
        if (perc > 99) {
            Session.set("scrollPercentage", 100);
        }
    });
});