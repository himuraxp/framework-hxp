export function checkObjectIsUnique(className) {
    let object = document.querySelector(className)
    if (object) {
        return false
    } else {
        return true
    }
}

export default checkObjectIsUnique