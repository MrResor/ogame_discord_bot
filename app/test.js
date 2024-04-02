import * as cheerio from 'cheerio';
import request from 'request';

class data {
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
    Fusion_Reactor = null;
    Light_Fighter = null;
    Heavy_Fighter = null;
    Cruiser = null;
    Battleship = null;
    Battlecruiser = null;
    Bomber = null;
    Destroyer = null;
    Deathstar = null;
    Reaper = null;
    Pathfinder = null;
    Small_Cargo = null;
    Large_Cargo = null;
    Colony_Ship = null;
    Recycler = null;
    Espionage_Probe = null;
    Solar_Satellite = null;
    Crawler = null;
    re_Light_Fighter = null;
    re_Heavy_Fighter = null;
    re_Cruiser = null;
    re_Battleship = null;
    re_Battlecruiser = null;
    re_Bomber = null;
    re_Destroyer = null;
    re_Deathstar = null;
    re_Reaper = null;
    re_Pathfinder = null;
    re_Small_Cargo = null;
    re_Large_Cargo = null;
    re_Colony_Ship = null;
    re_Recycler = null;
    re_Espionage_Probe = null;
    re_Solar_Satellite = null;
    re_Crawler = null;
    Rocket_Launcher = null;
    Light_Laser = null;
    Heavy_Laser = null;
    Gauss_Cannon = null;
    Ion_Cannon = null;
    Plasma_Turret = null;
    Small_Shield_Dome = null;
    Large_Shield_Dome = null;
    Anti_Ballistic_Missile = null;
    Weapons_Technology = null;
    Shielding_Technology = null;
    Armour_Technology = null;
    ship = ['Light_Fighter', 'Heavy_Fighter', 'Cruiser', 'Battleship',
        'Battlecruiser', 'Bomber', 'Destroyer', 'Deathstar', 'Reaper',
        'Pathfinder', 'Small_Cargo', 'Large_Cargo', 'Colony_Ship', 'Recycler',
        'Espionage_Probe', 'Solar_Satellite', 'Crawler'];
    buildings = ['Metal_Mine', 'Metal_Storage', 'Crystal_Mine',
        'Crystal_Storage', 'Deuterium_Synthesizer', 'Deuterium_Tank',
        'Solar_Plant', 'Fusion_Reactor'];
    defenses = ['Rocket_Launcher', 'Light_Laser', 'Heavy_Laser',
        'Gauss_Cannon', 'Ion_Cannon', 'Plasma_Turret', 'Small_Shield_Dome',
        'Large_Shield_Dome', 'Anti_Ballistic_Missile'];
    tech = ['Weapons_Technology', 'Shielding_Technology', 'Armour_Technology'];
}

//const rep_id = 'sr-en-254-fec4fa6ee28186201f857a708aa4c3d2723011b6';
const rep_id = 'sr-en-254-4e8d1c03c4a6c8e67ec515d0ca8367887aea616f';
const url = `https://nomoreangel.de/api-reader/?apiid=${rep_id}&engOut=on`;
const type = rep_id.split('-')[0];
var d = new data();
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
                            general_info(text, d);
                            break;
                        case 2:
                            coordinates(text, d);
                            break;
                        case 3:
                            get_from_li(text, $, d, 'buildings', '');
                            break;
                        case 4:
                            get_from_li(text, $, d, 'ship', '');
                            break;
                        case 5:
                            get_from_li(text, $, d, 'ship', 're_');
                            break;
                        case 6:
                            get_from_li(text, $, d, 'defenses', '');
                            break;
                        case 7:
                            get_from_li(text, $, d, 'tech', '');
                            break;
                    }
                });
                break;
            case 'br':
                console.log('To be implemented.');
                break;
        }
        console.log(d);
    }
});

function general_info(text, data) {
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

function coordinates(text, data) {
    const coords = text[2].split(' ')[1].split(':');
    data['galaxy'] = parseInt(coords[0]);
    data['system'] = parseInt(coords[1]);
    data['pos'] = parseInt(coords[2]);
    data['planet'] = ((text[3].split(' ')[1] === 'Planet') ? true : false);
}

function get_from_li(text, $, data, div, pre) {
    var key;
    for (let i = 0; i < text.length; i += 2) {
        key = pre + $(text[i]).text().replaceAll(/ |-/g, '_');
        if (data[key] === null) {
            data[key] = parseInt($(text[i + 1]).text().replaceAll('.', ''));
        }
    }
    data[div].forEach(b => {
        data[pre + b] = ((data[pre + b] === null) ? 0 : data[pre + b]);
    });
}