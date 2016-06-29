Router.route('/', {
    name: 'indicaPsicoHome',
    template: 'indicaPsicoHome'
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