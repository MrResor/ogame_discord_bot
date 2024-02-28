import dotenv from 'dotenv'
dotenv.config(); //initialize dotenv
import messages from './messages.js' //import text for messages
import mysql from 'mysql2/promise' // import for mysql connection

const con = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
    database: 'ogame_db'
}); // create database connection

// function for comparing arrays i found on the internet
function array_equals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

// constants for adding user
const req_keys1 = ['coords', 'characterClassId', 'allianceClassId', 'research'];
const req_keys2 = ['109', '110', '111', '114', '115', '117', '118'];

function wrong_channel(msg) {
    let str = messages['wrong_channel1'] + process.env.CHANNEL_ID
        + messages['wrong_channel2'];
    msg.reply(str).catch(console.error);
}

function print_help(msg) {
    msg.reply(messages['help_short']).catch(console.error);
    msg.reply(messages['help_full']).catch(console.error);
}

function unknown_command(msg) {
    msg.reply(messages['unknown_command']).catch(console.error);
}

async function add_user(msg) {
    // check input
    let input = JSON.parse(msg.content.slice(10));
    // wrong data messages
    if (!array_equals(Object.keys(input), req_keys1)) {
        msg.reply(messages['wrong_data']);
        return;
    }
    if (!array_equals(Object.keys(input['research']), req_keys2)) {
        msg.reply(messages['wrong_data']);
        return;
    }
    // check if user is already in the database
    let [res] = await con.query('SELECT * FROM users WHERE username = ?;',
        [msg.author['globalName']]);
    if (array_equals(Object.keys(res), [])) {
        // if user is not there add him
        const tech = input['research'];
        let values = [0, msg.author['globalName'], input['characterClassId'],
            tech['109'], tech['110'], tech['111'], tech['114'], tech['115'],
            tech['117'], tech['118']];
        let query = 'INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        [res] = await con.query(query, values);
        // add planet
        const coords = input['coords'].split(":").map(Number);
        values = [0, 1, res['insertId'], coords[0], coords[1], coords[2]];
        query = 'INSERT INTO planets VALUES (?, ?, ?, ?, ?, ?);';
        [res] = await con.query(query, values);
        msg.reply(`User ${msg.author["globalName"]} added to database.`);
        msg.reply(`Planet ${input['coords']} added to database with id 1.`);
    } else {
        console.log('user already added')
        // if user is there update technologies
        // check if planet is already added, if not add it
    }
}

export { wrong_channel, print_help, unknown_command, add_user };