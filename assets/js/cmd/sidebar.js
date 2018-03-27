let createObject = require('@js/tools/createObjectHTML')
let sidebar = null

class Sidebar {

    constructor(element, options = {}) {
        this.element = element
        this.root = createObject.createObjectHTML('ul', 'side-nav fixed', 'nav-mobile')
        this.element.appendChild(this.root)
    }

    addLogo(picture) {
        this.logoContainer = createObject.createObjectHTML('li', 'nav-side-logo')
        this.logo = createObject.createObjectHTML('img', 'nav-logo-side', null, picture)
        this.logoContainer.appendChild(this.logo)
        this.root.appendChild(this.logoContainer)
    }

}

export function addSidebar() {
    sidebar = new Sidebar(document.querySelector('#body'), {})
}

export function addLogoOnSidebar(picture) {
    console.log(picture)
    sidebar.addLogo(picture)
}