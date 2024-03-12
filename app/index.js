import client from './bot.js'
// var cron = require("cron");

//add job to check once a day any reports that are week old
//var job = new cron.CronJob('00 37 6,13,19 * * *', sendReminder); //main job

//main job function call
function check_old_reports() {
    // chceck what plannets were scanned more than a week ago
}

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token