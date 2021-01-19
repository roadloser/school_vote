/*
 * @Descripttion: 
 * @Author: roadloser
 * @Date: 2021-01-22 14:28:18
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:57:28
 */
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');
let js_files = files.filter(f => f.endsWith('.js'), files);

for (let f of js_files) {
  console.log(`import model from file ${f}...`);
  let name = f.substring(0, f.length - 3);
  module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.sync = db.sync