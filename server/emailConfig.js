Meteor.startup(function() {
    var SMTPLogin = Meteor.settings.smtpLogin;
    var SMTPPassword = Meteor.settings.smtpPassword;
    process.env.MAIL_URL = "smtp://" + SMTPLogin + ":" + SMTPPassword + "@smtp.mailgun.org:2525";
});

Meteor.methods({
    'sendEmail': function (to, from, subject, html) {
        check([to, from, subject, html], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({
            to: to,
            from: from,
            subject: subject,
            html: html
        });
    }
});