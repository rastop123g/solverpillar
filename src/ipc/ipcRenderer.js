import {ipcRenderer} from 'electron'

let select = function(selector, dbname){
    let promise = new Promise((resolve) => {
        ipcRenderer.send('select_db', {
            selector,
            dbname
        })
        ipcRenderer.once('select_data', (event, data) => {
            resolve(data)
        })
    })
    return promise;
}

export default {
    select
}