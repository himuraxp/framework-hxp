let signupForm = {
    name: 'signup',
    action: '/auth/signup',
    entity: [{
        id: 'firstName',
        type: 'text',
        class: 's12',
        label: 'First name',
        validate: true
    },{
        id: 'lastName',
        type: 'text',
        class: 's12',
        label: 'Last name',
        validate: true
    },{
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
    },{
        id: 'right',
        type: 'select',
        class: 's2',
        label: 'right',            
        select: [{
            id: 'admin'
        },{
            id: 'user'
        }],
        validate: true
    }]
}

module.exports = signupForm