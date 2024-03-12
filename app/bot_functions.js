import messages from './messages.js'; //import text for messages
import * as db from './db.js';
import * as util from './util.js';
import { AsciiTable3 } from 'ascii-table3';

// constants for adding user
const req_keys1 = ['coords', 'characterClassId', 'allianceClassId', 'researches'];
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
    if (add_check_input(msg)) return;
    
    // check if user is in the database
    let res = await db.get_user_id(msg);
    if (util.array_equals(Object.keys(res), [])) {
        // if user is not there add him
        await adding_user(msg);
    } else {
        // if user is there update technologies
        await update_tech(msg);
    }
    // check if planet is already added, if not add it
    await adding_planet(msg);
}

function add_check_input(msg) {
    const input = JSON.parse(msg.content.slice(10));
    let correct = false;
    // wrong data messages
    if (!util.array_equals(Object.keys(input), req_keys1)) {
        msg.reply(messages['wrong_data']).catch(console.error);
        correct = true;
    }
    if (!util.array_equals(Object.keys(input['researches']), req_keys2)) {
        msg.reply(messages['wrong_data']).catch(console.error);
        correct = true;
    }
    return correct;
}

async function adding_user(msg) {
    const res = await db.get_user_id(msg);
    if (!util.array_equals(res, [])) {
        msg.reply(messages['user_present']);
        return;
    } else {
        await db.add_user(msg);
        const str = messages['add_user1'] + msg.author["globalName"]
            + messages['add_user2'];
        msg.reply(str).catch(console.error);
    }
}

async function adding_planet(msg) {
    const res = await db.add_planet(msg);
    if (res[0] == -1) {
        msg.reply(messages['no_user']).catch(console.error);;
    } else if (res[0] == -2) {
        msg.reply(messages['planet_present']).catch(console.error);;
    }
    else {
        const str = messages['planet_add1'] + res[1] + messages['planet_add2']
            + res[0].toString() + messages['planet_add3'];
        msg.reply(str).catch(console.error);;
    }
}

async function update_tech(msg) {
    const res = await db.update_tech(msg);
    if (res == 0) {
        msg.reply(messages['update']).catch(console.error);;
    } else {
        msg.reply(messages['no_update']).catch(console.error);;
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

export { wrong_channel, print_help, unknown_command, add_user, planets };