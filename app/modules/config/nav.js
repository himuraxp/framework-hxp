let nav = {
    type: 'side',
    logo: '/img/logo.png',
    altLogo: 'Logo',
    linkLogo: '/',
    tabs: [{
        title: 'Home',
        icon: 'fa fa-home fa-lg',
        link: '/',
        dropdown: {
            active: false
        }
    },{
        title: 'Carousel',
        icon: 'fa fa-camera fa-lg',
        link: '/carousel',
        dropdown: {
            active: false
        }
    },{
        title: 'Connection',
        icon: 'fa fa-user fa-lg',
        link: '#!',
        dropdown: {
            active: true,
            entity: [{
                title: 'Signin',
                link: '/auth',
            },{
                title: 'Signup',
                link: '/auth/signup',
            }]
        }
    },{
        title: 'Back Office',
        icon: 'fa fa-cog fa-lg',
        link: '#!',
        dropdown: {
            active: true,
            entity: [{
                title: 'Navigation',
                link: '/config/nav',
            },{
                title: 'General',
                link: '/config/general',
            },{
                title: 'Styles',
                link: '/config/styles',
            },{
                title: 'Slider',
                link: '/config/slider',
            }]
        }
    }]   
}

module.exports = nav