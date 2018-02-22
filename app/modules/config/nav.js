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
    }]   
}

module.exports = nav