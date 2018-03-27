import { flashMessage } from '@js/flashMessage.js'
import { carousel } from '@js/carousel.js'
import { clientSocket } from '@js/clientSocket.js'
import { cmdSocket } from '@js/cmdSocket.js'
import { chat } from '@js/chat.js'
import { sass } from '@sass/global.scss'

export class Init {

    /**
     * @param {Global} Global
     * @param {locals} locals
     */
    constructor(Global, locals) {
        if (Global.route && Global.route.name === 'carousel') {
            // carousel()
        } else if (!Global.route || Global.route.name === '' && (locals && locals.connection)) {
            // let socket = io.connect('http://localhost:3021')
            // clientSocket(socket)
            // chat(socket)
        }
        let socket = io.connect('http://localhost:3021')
        clientSocket(socket)
        cmdSocket(socket)
        chat(socket)
        if (locals.flash) {
            let flashData = locals.flash
            new flashMessage(flashData)
        }
    }
}