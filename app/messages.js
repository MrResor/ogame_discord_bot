const messages = {
    unknown_command: 'Unknown command. Type !help for information about available commands.',
    wrong_channel1: 'Incorrect channel, please use <#',
    wrong_channel2: '> for any bot commands.',
    help_short: 'Available commands:\n'
        + '!add_user\t->\tAdds user to the data base, which allows for certain calculations when using other functions of this bot.\n',
    help_full: '!add_user\t->\tRequires a string from second API available in the fleet menu, but cut out after research.\n'
        + 'Example: "!add_user {"coords":"0:000:0","characterClassId":0,"allianceClassId":0,"research":{"109":0, "110":0, "111": 0, "114": 0, "115": 0, "117": 0, "118": 0"}}',
    wrong_data: 'Incorrect input, please type "!help" to see information about correct one.',
    no_update: 'No technologies to update.',
    update: 'Technologies updated.',
    add_user1: 'User ',
    add_user2: ' added to database.',
    no_user: 'You are not in the database, please use "!add_user" to add yourself. Type "!help" for any additional information.',
    user_present : 'Given user is already in the database.',
    planet_present: 'Given planet is already in the database.',
    planet_add1: 'Planet ',
    planet_add2: ' added to database with id ',
    planet_add3: '.',
}

export default messages;