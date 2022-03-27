#!/usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');

const { config } = require('./config.js');
const { listRequest, downGitRepo } = require('./githubHttp.js');

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
  .command('list')
  .description('list current file or floder list')
  .action(async (options) => {
    // 用户选择下载模板
    const answers = await inquirer.prompt(typesQue);
    const { componentType } = answers;
    const tags = await listRequest(componentType);
    const tagNames = tags.map(tag => tag.name);

    // 用户选择自己新下载的模板名称
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagNames,
      message: 'please choose a template to create project'
    });

    const spinner = ora('downloading');
    spinner.start();
    await downGitRepo(componentType, tag);
    // TODO ora stop 加载动画不停止
    spinner.stop();
    spinner.succeed('downloading succeed');
  });

// 解析字符串数组
program.parse(process.argv);
