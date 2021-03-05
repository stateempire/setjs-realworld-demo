var fs = require('fs');
var yaml = require('js-yaml');
var env = require('./environment.js');

var settings = {
  routerName: 'history',
  loader: 'progress-bar',
  timestamp: Date.now(),
  is_ssr: process.argv.join().indexOf('--mode=ssr') > 0,
};

var yamlConfig = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
var currentConfig = Object.assign(yamlConfig, yamlConfig[env.current.name]);
Object.assign(settings, currentConfig, getLocalConfig());

function getLocalConfig() {
  try {
    let local = yaml.load(fs.readFileSync('./_local.yml', 'utf8'));
    console.log('_local.yml', local);
    return local;
  } catch (e) {
    console.log('_local.yml was not used.');
  }
}

module.exports = settings;
