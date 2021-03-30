#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');

const { config } = require('./config.js');
const { FileController } = require('./fileController.js');

const fileController = new FileController(); 
const program = new Command();

const typesQue = [
  {
    type: 'list',
    name: 'componentType',
    message: 'Select component type',
    choices: config.typesArr,
  },
];

program.version('1.0.0', '-v, -version', 'output the current version');

program.name('node-file');

program
  .command('put <name>')
  .description('update local current floder')
  .option('-type, -t <type>', 'component type')
  .action((name, options) => {
    const type = options.T;
    if(!type) {
      console.error('type is null');
      return;
    }
    fileController.put(type, name);
  });

program
  .command('get <name>')
  .description('download remote current file, or floder')
  .option('-type, -t <type>', 'component type')
  .option('-save, -s [path]', 'file save path, default current path')
  .action((name, options) => {
    const optionPath = options.S;
    const type = options.T;
    
    if(!type) {
      console.error('type is null');
      return;
    }
    // 无指定路径，使用当前路径
    const path = optionPath ? optionPath : __dirname;
    fileController.get(type, name, path);
  });



program
  .command('list')
  .description('list current file or floder list')
  .action((options) => {
    inquirer
      .prompt(typesQue)
      .then((answers) => {
        const { types } = config;
        const { componentType } = answers;
        fileController.list(types[componentType]);
      });
  });

// 解析字符串数组
program.parse(process.argv);
