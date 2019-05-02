let toN = function(s) {
    if(s === undefined) {
        return 0
    } else if(typeof s === 'string') {
        return Number(s.replace(',', '.'))
    } else if(typeof s === 'number') {
        return s;
    }
}

export default {
    toN
}