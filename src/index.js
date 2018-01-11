#!/usr/bin/env node
import path from 'path'
import shell from 'shelljs'
import colors from 'colors'
import asciitree from 'ascii-tree'

const executionPath = process.cwd();

const execOptions = {
  silent: true
}


const execPrechecks = () => {
  if(!shell.which('npm')) {
    shell.echo("npm is not installed")
    shell.exit(0)
  }
}

const getDependencyTree = (_path) => {
  const { 
    name, 
    linkedDependencies: linkedDepsObj = {}
  } = require(path.join(_path, './package.json')) 

  const linkedDepsArr = Object.keys(linkedDepsObj)
    .map((key) => path.join(_path,linkedDepsObj[key]))

  let linkedDependencies = []
  while(linkedDepsArr.length !== 0) {
    let newPath = linkedDepsArr.shift()
    linkedDependencies.push(getDependencyTree(newPath))
  }

  return { name, path: _path, linkedDependencies }

}

const linkedDependencyTree = (tree) => {

  const recursiveLinking = (lnToDep) => (lnDep) => {
    shell.cd(lnDep.path)
    if(shell.exec("npm link", execOptions).code !== 0) {
      console.log(`[FAILED] linking global ${lnDep.name}`.red);
      process.exit(1);
    }
    shell.cd(lnToDep.path)
    if(shell.exec(`npm link ${lnDep.name}`, execOptions).code !== 0) {
      console.log(`[FAILED] linking ${lnDep.name} to ${lnToDep.name}`.red);
      process.exit(1);
    }
    
    lnDep.linkedDependencies.forEach(recursiveLinking(lnDep))
  }

  tree.linkedDependencies.forEach(recursiveLinking(tree))

}

const printResult = (tree) => {
  const level = 1

  const generateRecursiveTree = (level) => (str, node) => {
    const newLevel = level + 1
    const count = newLevel + 1
    return str += node.linkedDependencies.length !== 0 
      ? node.linkedDependencies.reduce(generateRecursiveTree(newLevel), `${Array(count).join('#')}${node.name}\r\n`) 
      : `${Array(count).join('#')}${node.name}\r\n`
  }

  let input = tree.linkedDependencies.reduce(generateRecursiveTree(level), `#${tree.name}\r\n`) 
  var output = asciitree.generate(input);

  shell.echo(output.grey)
}

export default function() {
  execPrechecks()

  let tree = getDependencyTree(process.cwd())
  let result = linkedDependencyTree(tree)

  shell.echo("Successfully linked packages")
  printResult(tree)
}