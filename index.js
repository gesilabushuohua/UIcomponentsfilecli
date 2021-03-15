#!/usr/bin/env node
const { Command  } = require('commander');
const program = new Command();

import { test } from './src/test';

test()

program
.version('1.0.0', '-v, -version', 'output the current version')

program
.name('node-file')

program
.command('list')
.description('list current file or floder list')
.action((options) => {
  console.log('list', options); 
});

program
.command('cd <path>')
.description('change directory')
.action((path, options) => {
  console.log('cd', path, options);
});

program
.command('put <name>')
.description('update local current path all file, or file, or floder')
.action((name, options) => {
  console.log('put', name, options);
})

program
.command('get <name>')
.description('download remote current file, or floder')
.action((file, options) => {
  console.log('get', file, options);
});

// 解析字符串数组
program.parse(process.argv);