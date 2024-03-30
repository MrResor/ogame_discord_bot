const messages = {
    unknown_command1: 'Unknown command "',
    unknown_command2: '". Type !help for information about available commands.',
    wrong_channel1: 'Incorrect channel, please use channel <#',
    wrong_channel2: '> for any bot commands.',
    help: `\`\`\`Available commands:
    !help                   ->  Prints this help.
    !help {func_name}       ->  Prints detailed help about function passed in unput as {func_name} without "!".
    !add_user {data}        ->  Adds user to the database using {data}, which allows for certain calculations when using other functions of this bot.
    !planets                ->  Prints planets that were added by a user.
    !add_planet {coords}    ->  Adds planet with {coords} to the given user.\`\`\``,
    help_add_user: `!add_user:
    Requires a string from second API available in the fleet menu, but cut out after research, with added "}" sign.
    Example: !add_user {"coords":"0:000:0","characterClassId":0,"allianceClassId":0,"research":{"109":0, "110":0, "111": 0, "114": 0, "115": 0, "117": 0, "118": 0"}}`,
    wrong_data: 'Incorrect input, please type "!help" to see information about correct one.',
    help_help: `!help:
    Standard function, prints basic information about usage of this bot. Can be used along with fuction name to print extended help for that function
    Example: !help add_user`,
    help_planets: `!planets:
    Prints planets that were assigned to the user with their ID which is used with "!farm" to calculate distances that are used to sort the results.`,
    help_add_planet: `!add_planet:
    Function for adding planet to the user. Added planets can be used as the farming point with "!farm" function.
    Example: !add_planet 1:111:11`,
    wrong_format: 'Provided data cannot be parsed to JSON, check if every "{" has a matching "}".',
    wrong_format_coords: 'Given coordinates are incorrect, it should be 3 numbers divided by :, and min values are respectively 1, 1, 1 while max are 9, 499, 15 respectively.\n Examples: 1:1:1 ; 9:499:15',
    no_update: 'No technologies to update.',
    update: 'Technologies updated.',
    add_user1: 'User ',
    add_user2: ' added to database.',
    no_user: 'You are not in the database, please use "!add_user" to add yourself. Type "!help" for any additional information.',
    user_present: 'Given user is already in the database.',
    planet_present: 'Given planet is already in the database.',
    planet_add1: 'Planet ',
    planet_add2: ' added to database with id ',
    planet_add3: '.',
}

export default messages;