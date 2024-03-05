import Discord from 'discord.js'; // import discord.js
import * as bot_func from './bot_functions.js' // import bot functionality

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers
    ]
}); // create new client

// login init
client.on('ready', () => {
    // add db connection
    console.log(`Logged in as ${client.user.tag}!`);
    // job.start();
});

// check messages
client.on('messageCreate', async msg => {
    // just in case to stop bots, may have to change behaviour later
    if (msg.author.bot) return;
    if (msg.content.startsWith('!')) {
        if (msg.channel.id != process.env.CHANNEL_ID) {
            bot_func.wrong_channel(msg);
        } else if (msg.content == '!help') {
            bot_func.print_help(msg);
        } else if (msg.content.startsWith('!add_user ')) {
            bot_func.add_user(msg);
        } else if (msg.content == '!planets') {
            bot_func.planets(msg);
        } else if (msg.content.startsWith('!add_planet ')) {
            msg.reply('Add planet func').error(console.error);
        } else if (msg.startsWith('!update_user')) {
            msg.reply('Add planet func').error(console.error);
        } else {
            bot_func.unknown_command(msg);
        }
    }
});

export default client;