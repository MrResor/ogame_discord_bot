import * as db from './db.js';
import * as util from './util.js';

// constants for adding user
const req_keys1 = ['coords', 'characterClassId', 'allianceClassId', 'researches'];
const req_keys2 = ['109', '110', '111', '114', '115', '117', '118'];

function add_check_input(msg) {
    let correct = 0;
    try {
        var input = JSON.parse(msg.content.slice(10));
    } catch (SyntaxError) {
        return -2
    }
    // wrong data messages
    if (!util.array_equals(Object.keys(input), req_keys1)) correct = -1;
    if (!util.array_equals(Object.keys(input['researches']), req_keys2)) correct = -1;
    return correct;
}

async function adding_user(msg) {
    const res = await db.get_user_id(msg);
    if (!util.array_equals(res, [])) return -1;
    await db.add_user(msg);
}

export { add_check_input, adding_user };