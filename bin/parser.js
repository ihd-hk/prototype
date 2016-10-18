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
    A: { en: 'Audio-Visual', ch: '视听' },
    C: { en: 'Acoustics', ch: '声学' },
    E: { en: 'ELV', ch: '弱电' },
    I: { en: 'IT/Communications', ch: '信息科技/通讯' },
    P: { en: 'Public Address', ch: '公共广播' },
    S: { en: 'Security', ch: '安防' },
    T: { en: 'PABX/Tel', ch: '公共广播系统/通讯' },
    F: { en: 'Future #1', ch: '未来#1' },
    Y: { en: 'Future #2', ch: '未来#2' },
  },
  codes: {
    H: { en: 'Hotel', ch: '酒店' },
    C: { en: 'Casino', ch: '赌场' },
    M: { en: 'Mall/Retail', ch: '商店' },
    O: { en: 'Office', ch: '办公室' },
    R: { en: 'Residential', ch: '住宅' },
    Z: { en: 'Mixed-Use Deveopment', ch: '综合发展' },
    Ú: { en: 'Auditorium', ch: '礼堂' },
    B: { en: 'Bar', ch: '酒吧' },
    N: { en: 'Cinema', ch: '电影院' },
    U: { en: 'Club', ch: '会所' },
    Y: { en: 'Community Centre', ch: '社区中心' },
    I: { en: 'Corporate/Investment Banking', ch: '企业/投资银行' },
    E: { en: 'Education', ch: '教学' },
    X: { en: 'Exhibition Gallery', ch: '展馆' },
    D: { en: 'Fine Dining/Restaurant', ch: '美食/餐厅' },
    L: { en: 'Healthcare', ch: '卫生保健' },
    S: { en: 'Museum/Visitors Centre/Show-Suite', ch: '博物馆/旅客中心/展览会埸' },
    T: { en: 'Theme Park', ch: '乐园' },
    V: { en: 'Villa', ch: '别墅' },
    W: { en: 'Worship', ch: '崇拜仪式会堂' },
  },
  countries: {},
};

data.items = data.items.filter(function(item) {
  return (item.project !== "0") && !!(item.project);
}).sort(function(a, b) {
  return (a.title_en > b.title_en) ? 1 : ((b.title_en > a.title_en) ? -1 : 0);
});

data.items.forEach(function(item, index, items) {
  if (!(item.country_en in data.countries)) {
    data.countries[item.country_en] = {
      en: item.country_en,
      ch: item.country_ch,
    };
  }
  items[index].files = glob.sync(item.project + '-*.jpg', {cwd: 'app/images/portfolio', nocase: true});
});


fs.writeFileSync('app/scripts/portfolio-data.json', JSON.stringify(data), 'utf-8');
