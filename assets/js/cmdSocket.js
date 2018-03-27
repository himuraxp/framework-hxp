let sidebar = require('@js/cmd/sidebar')
let check = require('@js/tools/checkObjectIsUnique')

class CmdSocket {

    constructor(s) {
        console.log('cmdSocket')
        let socket = s
        this.currentAction = ''
        
        this.addObserver('#message', '.chat-block-content')
        
        socket.on('addSidebar', () => {
            if (check.checkObjectIsUnique('.side-nav')) {
                sidebar.addSidebar()
            }
            socket.emit('showOption', 'sidebar')
        })

        socket.on('addLogoOnSidebar', (picture) => {
            sidebar.addLogoOnSidebar(picture)
            socket.emit('showOption', 'sidebar')
        })  
    }


    listenerObserver(mutation, arg) {
        let type = arg === 'id' ? '#' : '.'
        let element = mutation.target.querySelector(type+this.currentAction)
        if (element) {
            element.addEventListener('click', () => {
                this.preSelectCmd()
            })
        }
    }

    preSelectCmd() {
        let message = document.querySelector('#chat-message')
        let strLength = this.currentAction.length + 1
        message.focus()
        message.value = '/'+this.currentAction
        message.setSelectionRange(strLength, strLength);
    }

    addObserver(parent, child) {
        let target = document.querySelector(parent)
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                this.currentAction = mutation.target.querySelector('.chat-block-content p a').id
                this.listenerObserver(mutation, 'id')
                let childMutation = document.querySelector(child)
                let childObserver = new MutationObserver((childMutations) => {
                    childMutations.forEach((childMutation) => {
                        let nodes = childMutation.target.querySelectorAll('p a')
                        let lastChild = nodes[nodes.length - 1]
                        console.log(childMutation.target.querySelectorAll('p a')[lastChild])
                        this.currentAction = childMutation.target.querySelectorAll('p a')[lastChild].className
                        this.listenerObserver(childMutation, 'class')
                    })
                })
                let childConfig = { attributes: true, childList: true, characterData: true }
                childObserver.observe(childMutation, childConfig)
            })
        })
        let config = { attributes: true, childList: true, characterData: true }
        observer.observe(target, config)
    }
}

export function cmdSocket(socket) {
    new CmdSocket(socket)
}

export default cmdSocket