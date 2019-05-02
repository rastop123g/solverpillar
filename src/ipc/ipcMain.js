/* eslint-disable no-console */
import db from '../database'
import { ipcMain } from 'electron'

ipcMain.on('select_db', (event, arg) => {
    db[arg.dbname].find(arg.selector, (err, doc) => {
        event.sender.send('select_data', doc)
    })
});

ipcMain.on('insert_db', (event, arg) => {
    db[arg.dbname].insert(arg.page, (err, newdoc) => {
        event.sender.send('insert_check', newdoc)
    })
});

ipcMain.on('remove_db', (event, arg) => {
    db[arg.dbname].remove(arg.selector, (err, num) => {
        event.sender.send('remove_check', num)
    })
});

ipcMain.on('update_db', (event, arg) => {
    db[arg.dbname].update(arg.selector, arg.newDoc, {}, (err) => {
        if(!err){
            event.sender.send('update_check', 'ok')
        }
    })
});