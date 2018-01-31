#!/usr/bin/env node
var program = require('commander')

const { linkCommand, showCommand } = require('./src/index.js')


program
  .version(require('./package.json').version, '-v, --version')
  
program  
  .command('show')
  .action(showCommand)

program
  .command('link')
  .action(linkCommand)
  
  
program.parse(process.argv);
