const axios = require('axios');

const { config } = require('./config.js');

const request = axios.create({
  baseURL: config.host,
  timeout: 20000
});

const fileListRequest = (type, fn) => {
  return request.get(`/file/list/${type}`);
};

const fileGetRequest = (params) => {
  const { type, name } = params;
  return request.get(`/file/get/${type}/${name}`, {
    responseType: 'stream'
  });
};

const filePutRequest = (formData/* , fn */) => {
  return request.post(`/file/put/`, formData, {
    headers: formData.getHeaders()
  });
};

module.exports.fileListRequest = fileListRequest;
module.exports.fileGetRequest = fileGetRequest;
module.exports.filePutRequest = filePutRequest;
