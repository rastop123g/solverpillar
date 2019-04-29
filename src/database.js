/* eslint-disable no-console */
const Datastore = require('nedb');
import path from 'path'
import {app} from 'electron'
let db = {};
db.pillars = new Datastore({filename:path.join(app.getPath('userData'), '/pillars.db'), autoload: true});
db.wires = new Datastore({filename:path.join(app.getPath('userData'), '/wires.db'), autoload: true});

export default db;