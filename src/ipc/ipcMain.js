/* eslint-disable no-console */
import db from '../database'
import { ipcMain } from 'electron'

ipcMain.on('select_db', (event, arg) => {
    console.log('Идет выбор')
    console.log(arg)
    console.log(db['iso'])
    db[arg.dbname].find(arg.selector, (err, doc) => {
        console.log('docs : ', doc)
        event.sender.send('select_data', doc)
    })
})