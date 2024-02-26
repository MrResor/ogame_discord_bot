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
    const [result] = await con.query("SELECT * FROM users");
    msg.reply(JSON.stringify(result[0])).catch(console.error)
}

export { wrong_channel, print_help, unknown_command, add_user }