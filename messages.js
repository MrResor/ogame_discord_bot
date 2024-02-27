const messages = {
    unknown_command: 'Unknown command. Type !help for information about available commands.',
    wrong_channel1: 'Incorrect channel, please use <#',
    wrong_channel2: '> for any bot commands.',
    help_short: 'Available commands:\n'
        + '!add_user\t->\tAdds user to the data base, which allows for certain calculations when using other functions of this bot.\n',
    help_full: '!add_user\t->\tRequires a string from second API available in the fleet menu, but cut out after research.\n'
        + 'Example: "!add_user {"coords":"0:000:0","characterClassId":0,"allianceClassId":0,"research":{"109":8, "110":7, "111": 9, "114": 4, "115": 11, "117": 6, "118": 3"}}',
    wrong_data: 'Incorrect input, please type "!help" to see information about correct one.'
}

export default messages;