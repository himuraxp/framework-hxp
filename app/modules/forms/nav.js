let navForm = {
    name: 'nav',
    action: '/config/nav',
    entity: [{
        id: 'title',
        type: 'text',
        class: 's12',
        label: 'Title',
        validate: true
    },{
        id: 'icon',
        type: 'text',
        class: 's12',
        label: 'Add FontAwesome class',           
        validate: true
    },{
        id: 'link',
        type: 'text',
        class: 's12',
        label: 'Link',           
        validate: false
    }]
}

module.exports = navForm