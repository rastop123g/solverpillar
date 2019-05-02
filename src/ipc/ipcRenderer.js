import {ipcRenderer} from 'electron'
require('events').EventEmitter.defaultMaxListeners = 50;
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

let insert = function(page, dbname){
    let promise = new Promise((resolve) => {
        ipcRenderer.send('insert_db', {
            page,
            dbname
        })
        ipcRenderer.once('insert_check', (event, data) => {
            resolve(data)
        })
    }) 
    return promise;
}

let remove = function(selector, dbname){
    let promise = new Promise((resolve) => {
        ipcRenderer.send('remove_db', {
            selector,
            dbname
        })
        ipcRenderer.once('remove_check', (event, num) => {
            resolve(num)
        })
    })
    return promise;
}

let update = function(selector, newDoc, dbname){
    let promise = new Promise((resolve) => {
        ipcRenderer.send('update_db', {
            selector,
            dbname,
            newDoc
        })
        ipcRenderer.once('update_check', (event, check) => {
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