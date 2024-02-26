const Discord = require('discord.js'); //import discord.js
const mysql = require('mysql2'); //import for mysql connection
var messages = require('./messages') //import text for messages

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers
    ]
}); //create new client

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
    database: "ogame_db"
}); //create database connection

// login init
client.on('ready', () => {
    //add db connection
    console.log(`Logged in as ${client.user.tag}!`);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    //job.start();
});

//check messages
client.on('messageCreate', async msg => {
    // just in case to stop bots, may have to change behaviour later
    if (msg.author.bot) return;
    if (msg.content.startsWith("!")) {
        if (msg.channel.id != process.env.CHANNEL_ID) {
            str = messages.text('wrong_channel1') + process.env.CHANNEL_ID
                + messages.text('wrong_channel2');
            msg.reply(str).catch(console.error);
        } else if (msg.content == "!help") {
            msg.reply(messages.text('help_short')).catch(console.error)
            msg.reply(messages.text('help_full')).catch(console.error)
        } else if (msg.content.startsWith("!add_user ")) {
            console.log(msg.author["globalName"])
            console.log(msg.content)
        } else {
            msg.reply(messages.text('unknown_command'))
                .catch(console.error)
        }
    }
    // if (msg.channel.id != process.env.CHANNEL_ID) return;
    //     if (regx.test(msg.content) === true) {
    //         msg.reply(get_desired_content(msg.content)).catch(console.error);
    //     } else if (msg.content === 'ping') {
    //         msg.reply("pong <:jebacpolsl:987745197087686718>")
    //             .catch(console.error);
    //     }
});

module.exports = client