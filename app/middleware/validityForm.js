let regexpMaj = /[A-Z]/g
let regexpMin = /[a-z]/g
let regexpNum = /[0-9]/gi
let regexpMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/

let validityForm = (check, type) => {
    if (check && type) {
        if (type === 'email') {
            if (check.match(regexpMail)) {
                return true
            }
        } else if (type === 'password') {
            if (check.length > 5) {
                return true
            }
        } else if (type === 'select') {
            if (check) {
                return true
            }
        } else if (type === 'text') {
            if (check !== '') {
                return true
            }
        } else if (type === 'maxsize') {
            if (check.length < 30) {
                return true
            }
        }
    }
    return false
}

module.exports = validityForm