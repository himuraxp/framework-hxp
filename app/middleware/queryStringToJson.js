let queryStringToJSON = (data) => {         
    let pairs = data.split('&')
    
    let result = {}
    pairs.forEach((pair) => {
        pair = pair.split('=')
        result[pair[0]] = decodeURIComponent(pair[1] || '')
    })

    return JSON.parse(JSON.stringify(result))
}

module.exports = queryStringToJSON