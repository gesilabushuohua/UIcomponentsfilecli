const fs = require('fs');

const FormData = require('form-data');

const { config } = require('./config.js');
const { HandleFiles } = require('./bin/handleFiles');
const {
  fileListRequest,
  fileGetRequest,
  filePutRequest,
} = require('./http.js');

const handleFiles = new HandleFiles();

class FileController {
  constructor() {}

  isDirectory(path) {
    const state = fs.lstatSync(path);
    return state.isDirectory(path);
  }

  list(type) {
    const { types } = config;
    if (type === types.html || type === types.react) {
      console.info('developing');
    } else if (type === types.vue) {
      fileListRequest(types[type]).then((res) => {
        const files = res.data.data;
        files.forEach((file) => {
          console.info(file);
        });
      });
    }
  }

  /**
   * @function 下载文件
   * @param {type} 组件类型
   * @param {string} 文件名
   * @param {string} 保存路径
   */
  get(type, name, dir) {
    fileGetRequest({ name, type }).then(async (res) => {
      const fileStream = res.data;
      const fullName = `${dir}/${name}.zip`;
      handleFiles.readStreamToFile(fullName, fileStream);
    });
  }


  /**
   * @description 上传文件
   * @param {string} type
   * @param {string} name 文件名
   */
  async put(type, name) {
    const { zipName, fileStream} = await handleFiles.readFileToReadStream(name);
    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', fileStream);
    filePutRequest(formData).then((res) => {
      fs.rmSync(zipName);
      console.log(res.status);
    });
  }
}

module.exports.FileController = FileController;
