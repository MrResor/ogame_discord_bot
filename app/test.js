import * as cheerio from 'cheerio';
import request from 'request';

class test {
    datetime = null;
    loot_perc = null;
    ships = null;
    defense = null;
    metal = null;
    crystal = null;
    deuter = null;
    galaxy = null;
    system = null;
    pos = null;
    planet = null;
    Metal_Mine = null;
    Metal_Storage = null;
    Crystal_Mine = null;
    Crystal_Storage = null;
    Deuterium_Synthesizer = null;
    Deuterium_Tank = null;
    Solar_Plant = null;
    Light_Fighter = null;
    Heavy_Fighter = null;
    Cruiser = null;
    Battleship = null;
    Battlecruiser = null;
    Bomber = null;
    Destroyer = null;
    Reaper = null;
    Pathfinder = null;
    Small_Cargo = null;
    Large_Cargo = null;
    Recycler = null;
    Espionage_Probe = null;
    Solar_Satellite = null;
    Crawler = null;
}

//const rep_id = 'sr-en-254-fec4fa6ee28186201f857a708aa4c3d2723011b6';
const rep_id = 'sr-en-254-4e8d1c03c4a6c8e67ec515d0ca8367887aea616f';
const url = `https://nomoreangel.de/api-reader/?apiid=${rep_id}&engOut=on`;
const type = rep_id.split('-')[0];
var data = {};
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        switch (type) {
            case 'sr':
                const divs = $('div.main');
                var text;
                divs.each((i, div) => {
                    if (i < 3) {
                        $(div).find('br').replaceWith('\n');
                        text = $(div).text().split(/\r?\n/);
                    } else {
                        text = $(div).find('td');
                    }
                    switch (i) {
                        case 0:
                            general_info(text);
                            break;
                        case 2:
                            coordinates(text);
                            break;
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            for (let i = 0; i < text.length; i += 2) {
                                data[$(text[i]).text().replaceAll(/ |-/g, '_')]
                                    = parseInt($(text[i + 1]).text().
                                        replaceAll('.', ''));
                            }
                            break

                    }
                });
                break;
            case 'br':
                console.log('To be implemented.');
                break;
        }
        console.log(data);
    }
});

function general_info(text) {
    const date = text[0].split(' ')[3].split('-');
    const time = text[1].split(' ')[1].split(':');
    data['datetime'] = new Date(date[2], date[1], date[0],
        time[0], time[1], time[2]);
    const perc = text[4].split(' ')[2];
    data['loot_perc'] = parseInt(perc.slice(0, perc.length - 1)) / 100;
    data['ships'] = parseInt(text[5].split(' ')[3]);
    data['defense'] = parseInt(text[6].split(' ')[3]);
    data['metal'] = parseInt(text[8].split(' ')[1].replaceAll('.', ''));
    data['crystal'] = parseInt(text[9].split(' ')[1].replaceAll('.', ''));
    data['deuter'] = parseInt(text[10].split(' ')[1].replaceAll('.', ''));
}

function coordinates(text) {
    const coords = text[2].split(' ')[1].split(':');
    data['galaxy'] = parseInt(coords[0]);
    data['system'] = parseInt(coords[1]);
    data['pos'] = parseInt(coords[2]);
    data['planet'] = ((text[3].split(' ')[1] === 'Planet') ? true : false);
}