import * as cheerio from 'cheerio';
import request from 'request';

const rep_id = 'sr-en-254-fec4fa6ee28186201f857a708aa4c3d2723011b6';
const url = `https://nomoreangel.de/api-reader/?apiid=${rep_id}&engOut=on`;
const type = rep_id.split('-')[0];
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        switch (type) {
            case 'sr':
                const divs = $('div.main');
                var text;
                divs.each((i, div) => {
                    $(div).find('br').replaceWith('\n');
                    text = $(div).text().split(/\r?\n/);
                    console.log(text);
                    console.log('======');
                });
        }
        
    }
});