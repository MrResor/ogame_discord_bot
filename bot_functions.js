import dotenv from 'dotenv'
dotenv.config(); //initialize dotenv
import messages from './messages.js' //import text for messages
import mysql from 'mysql2/promise' // import for mysql connection

const con = await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
    database: "ogame_db"
}); // create database connection

function array_equals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

const req_keys1 = ['coords', 'characterClassId', 'allianceClassId', 'research']
const req_keys2 = ['109', '110', '111', '114', '115', '117', '118']

function wrong_channel(msg) {
    str = messages['wrong_channel1'] + process.env.CHANNEL_ID
        + messages['wrong_channel2'];
    msg.reply(str).catch(console.error);
}

function print_help(msg) {
    msg.reply(messages['help_short']).catch(console.error)
    msg.reply(messages['help_full']).catch(console.error)
}

function unknown_command(msg) {
    msg.reply(messages['unknown_command']).catch(console.error)
}

async function add_user(msg) {
    // check input
    let input = JSON.parse(msg.content.slice(10))
    if (!array_equals(Object.keys(input), req_keys1)) {
        // wrong data message
        msg.reply(messages['wrong_data']);
        return;
    }
    if (!array_equals(Object.keys(input['research']), req_keys2)) {
        // wrong data message
        msg.reply(messages['wrong_data']);
        return;
    }
    msg.reply(JSON.stringify(input));
    // check if user is already in the database
    // if user is there update technologies
    // if user is not there add him
    //const [result] = await con.query("SELECT * FROM users WHERE username = ?",[msg.author['globalName']]);
}

export { wrong_channel, print_help, unknown_command, add_user }