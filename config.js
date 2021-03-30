const config = {};

config.host  = 'http://127.0.0.1:7001';

const types = {};
types[types['html'] = 1] = 'html';
types[types['vue'] = 2] = 'vue';
types[types['react'] = 3] = 'react';
config.types = types;

const typesArr = ['html', 'vue', 'react'];
config.typesArr = typesArr;

module.exports.config = config; 