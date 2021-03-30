const fs = require('fs');
const JSZIP = require('jszip');

class HandleFiles {
  constructor() {}

  /**
   *
   * @param {string} dir 文件
   * @returns boolean
   */
  isDirectory(dir) {
    const state = fs.lstatSync(dir);
    return state.isDirectory(dir);
  }

  /**
   * @function 文件夹转为 zip buffer
   */
  async readFileToZipBuffer(dir) {
    const zip = new JSZIP();
    
    if (!this.readFloder(zip, dir)) {
      return;
    }
    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9,
      },
    });
    return buffer;
  }

  /**
   * @function 读取文件
   */
  async readFloder(zip, path) {
    if (fs.existsSync(path) && this.isDirectory(path)) {
      const files = fs.readdirSync(path, { withFileTypes: true });

      files.forEach((file) => {
        const filePath = `${path}/${file.name}`;

        if (this.isDirectory(filePath)) {
          const zipFloder = zip.folder(file.name);
          this.readFloder(zipFloder, filePath);
        } else {
          zip.file(file.name, fs.readFileSync(filePath));
        }
      });
      return true;
    }

    return false;
  }

  /**
   * @function 解析 zip stream, 指定文件内容
   * @param {buffer} stream zip stream
   * @param {string} fileName 解读指定文件内容
   * @return {object}
   */
  async bufferToZipContent(buffer) {
    const zip = new JSZIP();
    const zipContent = await zip.loadAsync(buffer);
    return zipContent;
  }

  /**
   * @function 解析后的 zip 内容，存储到硬盘
   * @param dir
   * @param zipContent
   * @returns
   */
  async writeZipContentFile(dir, zipContent) {
    try {
      !fs.existsSync(dir) && fs.mkdirSync(dir);
      const filesObj = zipContent.files;
      Object.keys(filesObj).forEach((key) => {
        const file = filesObj[key];
        const filePath = `${dir}/${file.name}`;
        if (file.dir && !fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
        } else if (!file.dir) {
          // 把每个文件buffer写到硬盘中
          file
            .async('nodebuffer')
            .then((content) => fs.writeFileSync(filePath, content));
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }

    return true;
  }

  async unZip(path) {
    const dir = path.replace('.zip', '');
    const buffer = fs.readFileSync(path);
    const zipContent = await this.bufferToZipContent(buffer);
    return await this.writeZipContentFile(dir, zipContent);
  }

  writeZipFile(fullName, stream) {
    return new Promise((resolve, reject) => {
      try {
        const writeStream = fs.createWriteStream(fullName);
        stream.pipe(writeStream);
        stream.on('end', resolve);
      } catch (err) {
        reject(err);
      }
    });
  }

  // 文件转 zip 字节流
  async readFileToReadStream(name) {
    if(!fs.existsSync(name)) {
      throw new Error( `${name} is not exist`);
    }
    const buffer = await this.readFileToZipBuffer(name);
    const zipName = `${name}.zip`;
    fs.writeFileSync(zipName, buffer);
    const fileStream = fs.createReadStream(zipName);
    return {
      zipName,
      fileStream
    };
  }

  //  zip stream 字节流转为文件
  async readStreamToFile(fullName, fileStream) {
    // zip read stream 生成 zip
    await this.writeZipFile(fullName, fileStream);
    // 解压文件
    await this.unZip(fullName);
    // 删除 zip
    fs.rmSync(fullName);
  }
}

module.exports.HandleFiles = HandleFiles;
