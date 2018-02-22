let signinForm = {
    name: 'signin',
    action: '/auth',
    entity: [{
        id: 'email',
        type: 'email',
        class: 's12',
        label: 'Email',
        validate: true
    },{
        id: 'password',
        type: 'password',
        class: 's12',
        label: 'Password',           
        validate: true
    }]
}

module.exports = signinForm