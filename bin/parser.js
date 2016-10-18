#!/usr/bin/env node

var XLSX = require('xlsx'),
    fs = require('fs'),
    _ = require('underscore'),
    glob = require('glob');


var args = process.argv.slice(2);


var workbook = XLSX.readFile(args[0]);
var worksheet = workbook.Sheets.WEBSITE;


data = {
  items: XLSX.utils.sheet_to_json(worksheet, { header: ['id', 'project', 'date', 'title_en', 'title_ch', 'disciplines', 'codes', 'city_en', 'city_ch', 'country_en', 'country_ch', 'hotel_en', 'hotel_ch', 'desc_en', 'desc_ch'], range: 6 }),
  disciplines: {
    A: 'Audio-Visual',
    C: 'Acoustics',
    E: 'ELV',
    I: 'IT/Communications',
    P: 'Public Address',
    S: 'Security',
    T: 'PABX/Tel',
    F: 'Future #1',
    Y: 'Future #2',
  },
  codes: {
    H: 'Hotel',
    C: 'Casino',
    M: 'Mall/Retail',
    O: 'Office',
    R: 'Residential',
    Z: 'Mixed-Use Deveopment',
    Ú: 'Auditorium',
    B: 'Bar',
    N: 'Cinema',
    U: 'Club',
    Y: 'Community Centre',
    I: 'Corporate/Investment Banking',
    E: 'Education',
    X: 'Exhibition Gallery',
    D: 'Fine Dining/Restaurant',
    L: 'Healthcare',
    S: 'Museum/Visitors Centre/Show-Suite',
    T: 'Theme Park',
    V: 'Villa',
    W: 'Worship',
  },
  countries: {},
};

data.items = data.items.filter(function(item) {
  return (item.project !== "0") && !!(item.project);
});
data.items = data.items.sort(function(a, b) {
  return (a.title_en > b.title_en) ? 1 : ((b.title_en > a.title_en) ? -1 : 0);
});

data.items.forEach(function(item, index, items) {
  if ((item.country_en !== "0") && !!(item.country_en)) {
    data.countries[item.country_en] = item.country_en;
  }
  items[index].files = glob.sync(item.project + '-*.jpg', {cwd: 'app/images/portfolio', nocase: true});
});


fs.writeFileSync('app/scripts/portfolio-data.json', JSON.stringify(data), 'utf-8');
