const config = {};

config.user = 'gesilabushuohua';

config.git = `https://api.github.com/repos/${config.user}`;

const types = {};
types[types['vue'] = 1] = 'vue';
config.types = types;

const typesArr = ['vue'];
config.typesArr = typesArr;

config.repos = {
  'vue': 'vue-template'
};

module.exports.config = config; 