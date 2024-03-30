import messages from './messages.js'; //import text for messages
import * as db from './db.js';
import { AsciiTable3 } from 'ascii-table3';
import * as user_add from './add_user.js';

function wrong_channel(msg) {
    let str = messages['wrong_channel1'] + process.env.CHANNEL_ID
        + messages['wrong_channel2'];
    msg.reply(str).catch(console.error);
}

function print_help(msg) {
    msg.reply(messages['help']).catch(console.error);
}

function print_full_help(msg) {
    let str = messages['help_' + msg.content.slice(6)];
    if (str === undefined) {
        str = messages['unknown_command1'] + "!" + msg.content.slice(6) +
            messages['unknown_command2'];
    }
    msg.reply(str).catch(console.error);
}

function unknown_command(msg) {
    const str = messages['unknown_command1'] + msg.content +
        messages['unknown_command2'];
    msg.reply(str).catch(console.error);
}

async function add_user(msg) {
    // check input
    let check = user_add.add_check_input(msg);
    switch (check) {
        case -1:
            msg.reply(messages['wrong_data']).catch(console.error);
            return;
        case -2:
            msg.reply(messages['wrong_format']).catch(console.error);
            return;
    }
    // if user is not there add him
    if (await user_add.adding_user(msg) == -1) {
        // if user is there update technologies
        msg.reply(messages['user_present']).catch(console.error);
        await update_tech(msg);
    } else {
        const str = messages['add_user1'] + msg.author["globalName"]
            + messages['add_user2'];
        msg.reply(str).catch(console.error);
    }
    // check if planet is already added, if not add it
    const coords = JSON.parse(msg.content.slice(10))['coords'];
    await adding_planet(msg, coords);
}

async function adding_planet(msg, input) {
    const coords = input.split(':').map(Number);
    if (coords.length != 3) {
        msg.reply(messages['wrong_format_coords']).catch(console.error);
        return;
    }
    if (coords[0] < 1 || coords[0] > 9 || coords[1] < 1 || coords[1] > 499
        || coords[2] < 1 || coords[2] > 15) {
        msg.reply(messages['wrong_format_coords']).catch(console.error);
        return;
    }

    const res = await db.add_planet(msg, coords);
    if (res == -1) {
        msg.reply(messages['no_user']).catch(console.error);
    } else if (res == -2) {
        msg.reply(messages['planet_present']).catch(console.error);
    } else {
        const str = messages['planet_add1'] + input + messages['planet_add2']
            + res.toString() + messages['planet_add3'];
        msg.reply(str).catch(console.error);
    }
}

async function add_planet(msg) {
    const coords = msg.content.split(" ")[1];
    await adding_planet(msg, coords);
}

async function update_tech(msg) {
    var input;
    try {
        input = JSON.parse(msg.content.split(" ")[1]);
    } catch (SyntaxError) {
        msg.reply(messages['wrong_format']).catch(console.error);
    }
    const res = await db.update_tech(msg, input);
    if (res == 0) {
        msg.reply(messages['update']).catch(console.error);
    } else {
        msg.reply(messages['no_update']).catch(console.error);
    }
}

async function planets(msg) {
    const res = await db.get_planets(msg);
    let arr = [];
    for (let r of res) {
        arr.push([r['id'], Object.values(r).splice(1).join(':')])
    }
    const table = new AsciiTable3().setHeading('id', 'coords').
        setAlignCenter(3).addRowMatrix(arr)
    msg.reply('```\n' + table.toString() + '```').catch(console.error);
}

export { wrong_channel, print_help, unknown_command, add_user, planets, print_full_help, add_planet, update_tech };