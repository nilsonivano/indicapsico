Router.route('/', {
    name: 'main2',
    template: 'main2'
});

Router.route('/discount', {
    name: 'indicaPsicoHomeDiscount',
    template: 'indicaPsicoHomeDiscount'
});

Router.route('/userLeads', {
    name: 'adminUserLeads',
    template: 'adminUserLeads',
    subscriptions: function() {
        if(Meteor.user()){
            return (Meteor.subscribe('userLeadsAll'),
            Meteor.subscribe('psicoDatabaseAll'));
        }
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/psicoPanel', {
    name: 'adminPsicoPanel',
    template: 'adminPsicoPanel'
});

if(Meteor.isClient){
    Router.plugin('seo',
        {
            defaults: {
                title: 'IndicaPsico - Encontre agora o melhor psicólogo para você',
                description: 'Encontre agora o melhor psicólogo para você.',
                //image: 'http://lemeat.com/images/lemeat_launcher_icon.png',
                meta: {
                    keywords: ['indica psicólogo', 'indicapsico', 'psicologia', 'psicólogo']
                },
                twitter: {
                    card: 'IndicaPsico'
                },
                og: {
                    site_name: 'IndicaPsico - Encontre agora o melhor psicólogo para você',
                    title: 'IndicaPsico - Encontre agora o melhor psicólogo para você',
                    description: 'Encontre agora o melhor psicólogo para você.',
                    //image: 'http://lemeat.com/images/lemeat_launcher_icon.png',
                    type: 'website'
                }
            }
        });
}