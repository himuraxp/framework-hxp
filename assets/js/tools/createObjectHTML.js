export function createObjectHTML(type, className, id, url) {
    let object = document.createElement(type)
    if (className) {
        object.setAttribute('class', className)
    }
    if (id) {
        object.setAttribute('id', id)
    }
    if (url) {
        if (type === 'a') {
            object.setAttribute('href', url)
        } else if (type === 'img') {
            object.setAttribute('src', url)
        }
    }
    return object
}
