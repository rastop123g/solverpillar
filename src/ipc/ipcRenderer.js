import {ipcRenderer} from 'electron'
require('events').EventEmitter.defaultMaxListeners = 50;

let id = 0;

let getChanel = function() {
    return id++;
}

let select = function(selector, dbname){
    let promise = new Promise((resolve) => {
        let chanel = String(getChanel())
        ipcRenderer.send('select_db', {
            selector,
            dbname,
            chanel
        })
        ipcRenderer.once(chanel, (event, data) => {
            resolve(data)
        })
    })
    return promise;
}

let insert = function(page, dbname){
    let promise = new Promise((resolve) => {
        let chanel = String(getChanel())
        ipcRenderer.send('insert_db', {
            page,
            dbname,
            chanel
        })
        ipcRenderer.once(chanel, (event, data) => {
            resolve(data)
        })
    }) 
    return promise;
}

let remove = function(selector, dbname){
    let promise = new Promise((resolve) => {
        let chanel = String(getChanel())
        ipcRenderer.send('remove_db', {
            selector,
            dbname,
            chanel
        })
        ipcRenderer.once(chanel, (event, num) => {
            resolve(num)
        })
    })
    return promise;
}

let update = function(selector, newDoc, dbname){
    let promise = new Promise((resolve) => {
        let chanel = String(getChanel())
        ipcRenderer.send('update_db', {
            selector,
            dbname,
            newDoc,
            chanel
        })
        ipcRenderer.once(chanel, (event, check) => {
            resolve(check)
        })
    })
    return promise;
}

export default {
    select,
    insert,
    remove,
    update
}