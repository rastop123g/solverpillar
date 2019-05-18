/* eslint-disable no-console */
/* global __static */
const Datastore = require('nedb');
import path from 'path'
import {app} from 'electron'
const fs = require('fs');

stat('/pillars.db').then(f => {
    if(f) {
        connect()
    } else {
        copy('/pillars.db').then(() => {
            return copy('/wires.db')
        }).then(() => {
            return copy('/isolators.db')
        }).then(() => {
            return copy('/traverses.db')
        }).then(() => {
            connect()
        })
    }
})
let db = {};

function connect() {
    db.pillars = new Datastore({filename:path.join(app.getPath('userData'), '/pillars.db'), autoload: true});
    db.wires = new Datastore({filename:path.join(app.getPath('userData'), '/wires.db'), autoload: true});
    db.isolators = new Datastore({filename:path.join(app.getPath('userData'), '/isolators.db'), autoload: true});
    db.traverses = new Datastore({filename:path.join(app.getPath('userData'), '/traverses.db'), autoload: true}); 
}

function stat(dbname) {
    return new Promise(resolve => {
        fs.stat(path.join(app.getPath('userData'), dbname) , err => {
            if(err == null) {
                resolve(true)
            } else if(err.code == 'ENOENT') {
                resolve(false)
            } else {
                resolve(false)
            }
        })
    })
}

function copy(dbname) {
    return new Promise(resolve => {
        fs.copyFile(path.join(__static, 'dbnew', dbname), path.join(app.getPath('userData'), dbname), err => {
            if(err) throw err;
            resolve()
        })
    })
}

export default db;