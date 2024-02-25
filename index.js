require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
// var cron = require("cron");

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers
    ]
}); //create new client

//add job to check once a day any reports that are week old
//var job = new cron.CronJob('00 37 6,13,19 * * *', sendReminder); //main job

// login init
client.on('ready', () => {
    //add db connection
    console.log(`Logged in as ${client.user.tag}!`);
    //job.start();
});

//main job function call
function check_old_reports() {
    // chceck what plannets were scanned more than a week ago
}



//check messages
client.on('messageCreate', async msg => {
    // just in case to stop bots, may have to change behaviour later
    if (msg.author.bot) return;
    if(msg.content[0] == "!") {
        if (msg.channel.id != process.env.CHANNEL_ID) {
            str = "Incorrect channel, please use <#" + process.env.CHANNEL_ID
                + "> for any bot commands."
            msg.reply(str).catch(console.error);
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

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token