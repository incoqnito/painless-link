# painless-link

The motivation for ‘painless-link’ has arisen when splitting a large project into many small submodules. These submodules should be used in several projects. To ensure this, we have linked the various submodules with the packages via ‘npm link’.

With the number of submodules, the number of symlinks has also increased. Therefore, we decided to use ‘painless-link’ - a configurable and fully automatic symlink solution based on ‘npm link’. 

In the main project, the symlinks are specified in the ‘package.json’ in property ‘linkedDependencies’. ‘painless-link` tracks all ‘linkedDependencies’ and resolves their ‘linkedDependencies’ recursively. No time-consuming Bash scripts and / or no time-consuming navigation through the individual subprojects 💪 

Great solutions such as [Lerna.js](https://github.com/lerna/lerna) were unthinkable at the time, as the VCS SVN was used.

## Installation

**As global**

`npm install -g painless-link`

**or as package dependency**

`npm install --save-dev painless-link`

## How to use

1. Add to `package.json` every dependency which should be resolved as following:

```json
{
  "linkedDepedancies": {
    "dependencyA": "../modules/dependencyA" 
  }
}
```

2. Add painless-link to your scripts

```json
{
  "scripts": {
    "postinstall": "painless-link"
  }
}
```

### Every linked dependency should have a `package.json`

## Roadmap
Every project can be optimised and also this package has a huge roadmap 🤓
- make it more painless 😋
- better error handling
- own symlink system, for avoiding collision with existing linked npm packages
- configuration file for extending `painless-link`
- create test cases for node, webpack, etc.
- build CLI interface for more options like verbose mode
- environment specific linking like only linking in `NODE_ENV=development`
