const axios = require('axios');
const util = require('util');
const downloadGitRepo = require('download-git-repo');

const downloadGitRepoAsync = util.promisify(downloadGitRepo);
const { config: { git, user, repos } } = require('./config.js');


const request = axios.create({
  baseURL: git,
  timeout: 20000
});

request.interceptors.response.use(res => {
  return res.data;
})

const listRequest = (type) => {
  return request.get(`/${repos[type]}/tags`);
};

const downGitRepo = (type, tag) => {
  return downloadGitRepoAsync(`github:${user}/${repos[type]}#${tag}`, 
  `${repos[type]}-${tag}`, 
  function(err) {
    console.log(err ? err : 'Success');
  });
}


module.exports.listRequest = listRequest;
module.exports.downGitRepo = downGitRepo;
