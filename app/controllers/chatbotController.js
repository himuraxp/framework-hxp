class ChatbotController {

    constructor() {
        this.chatbot = null
    }

    static addEventClick(name) {
        return '<a id="'+name+'" href="#">/'+name+'</a>'
    }

    static initMessage(content) {
        let date = new Date()
        let data = {
            id: this.chatbot.id+date.getHours()+date.getMinutes()+date.getSeconds(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            content: '<br>'+content,
            user: this.chatbot
        }
        return data
    }

    static welcome(bot, user) {
        this.chatbot = bot
        if (!user) {
            return this.initMessage('For use my services give me your <b>pseudo</b> and <b>mail</b>')
        } else {
            return this.initMessage('Add a sidebar => '+ this.addEventClick('addSidebar'))
        }
    }

    static setNotice() {
        return this.initMessage('Add a sidebar => /addSidebar')
    }

    static setMessage(message) {
        return this.initMessage(message)
    }

    static setCmd(cmd) {
        if (cmd === '/addSidebar') {
            return { status: 'success', message: this.initMessage('I add a sidebar'), cmd: 'addSidebar'}
        } else if (cmd.match('/addLogoOnSidebar')) {
            let tmp = cmd.split(' ')
            let picture = tmp[1]
            return { status: 'success', message: this.initMessage('I add a logo on sidebar'), cmd: 'addLogoOnSidebar', picture: picture}
        } else {
            return { status: 'error', message: this.initMessage('This command does not exist')}
        }
    }

    static showOption(option) {
        console.log(option)
        if (option === 'sidebar') {
            return this.initMessage('<b>Sidebar</b><br>Add logo => '+this.addEventClick('addLogoOnSidebar')+' + url')
        }
    }

}

module.exports = ChatbotController