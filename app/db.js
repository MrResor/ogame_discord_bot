import dotenv from 'dotenv'
dotenv.config(); //initialize dotenv
import mysql from 'mysql2/promise'; // import for mysql connection
import * as util from './util.js';

const con = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
    database: 'ogame_db'
}); // create database connection

async function get_user_id(msg) {
    const values = [msg.author['globalName']];
    const query = 'SELECT id FROM users WHERE username = ?;';
    const [res] = await con.query(query, values);
    return res;
}

async function add_user(msg) {
    const input = JSON.parse(msg.content.slice(10));
    const tech = input['researches'];
    const values = [0, msg.author['globalName'], input['characterClassId'],
        tech['109'], tech['110'], tech['111'], tech['114'], tech['115'],
        tech['117'], tech['118']];
    const query = 'INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    await con.query(query, values);
}

async function add_planet(msg) {
    // no user error
    let res = await get_user_id(msg);
    if (util.array_equals(res, [])) return [-1];
    const userid = res[0]['id'];

    // check if the planet is already added
    res = await get_planet_id(msg);
    if (!util.array_equals(res, [])) return [-2];

    // get max index of planet for that user
    let query = `SELECT MAX(P.id) FROM planets AS P JOIN users AS U ON
                    P.user_id = U.id WHERE U.username = ?;`;
    let values = [msg.author['globalName']];
    [res] = await con.query(query, values);

    // add the planet
    if (res['MAX(P.id)'] == null) res['MAX(P.id)'] = 0;
    const input = JSON.parse(msg.content.slice(10));
    const coords = input['coords'].split(':').map(Number);
    query = 'INSERT INTO planets VALUES (?, ?, ?, ?, ?, ?);';
    values = [0, res['MAX(P.id)'] + 1, userid, coords[0], coords[1], coords[2]];
    await con.query(query, values);

    // return coords and id
    return [res['MAX(P.id)'] + 1, input['coords']];
}

async function update_tech(msg) {
    const input = JSON.parse(msg.content.slice(10));
    const tech = input['researches'];
    let values = []
    let query = `SELECT class, fight, shield, armor, hyperspace, fuel_drive, pulse_drive, hyper_drive FROM users WHERE username = ?`
    const [res] = await con.query(query, values)
    values = [input['characterClassId'], tech['109'], tech['110'],
    tech['111'], tech['114'], tech['115'], tech['117'],
    tech['118']];
    const data = [res[0]['class'], res[0]['fight'], res[0]['shield'],
    res[0]['armor'], res[0]['hyperspace'],
    res[0]['fuel_drive'], res[0]['pulse_drive'],
    res[0]['hyper_drive']];
    if (util.array_equals(values, data)) {
        return -1;
    } else {
        query = `UPDATE users SET class = ?, fight = ?, shield = ?,
                    armor = ?, hyperspace = ?, fuel_drive = ?,
                    pulse_drive = ?, hyper_drive = ? WHERE username = ?;`;
        values = values.push(msg.author['globalName']);
        await con.query(query, values);
        return 0;
    }
}

async function get_planets(msg) {
    const query = `SELECT P.id, P.galaxy, P.system, P.place FROM planets AS
                    P JOIN users AS U ON P.user_id = U.id WHERE
                    U.username = ?;`;
    const values = [msg.author['globalName']];
    const [res] = await con.query(query, values);
    return res;
}

async function get_planet_id(msg) {
    const input = JSON.parse(msg.content.slice(10));
    const coords = input['coords'].split(':').map(Number);
    const query = `SELECT id FROM planets AS P WHERE P.galaxy = ? AND P.system
                    = ? AND P.place = ?;`;
    const values = [coords[0], coords[1], coords[2]];
    const [res] = await con.query(query, values);
    return res;
}

export { get_user_id, add_user, add_planet, update_tech, get_planets };