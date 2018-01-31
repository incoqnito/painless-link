# painless-link 🤩

## Motivation

The need for something like `painless-link` has arisen while trying to split a large project into many small submodules (for various reasons).
In order to do so and to be able to continue using __HMR__, we linked the various submodules to our package via `npm link`.
However we found out, that we had to manually execute `npm link <SUBMODULE>` every time we did an `npm install` in our root project.

With a rising number of submodules, the number of symlinks also increased - meaning, that we had to __type `npm link <SUBMODULE>` dozens of times after every `npm install`__.
Therefore, we decided to create ‘painless-link’ - a configurable and fully automatic symlink solution utilizing `npm link`. 🤩

## Installation

**Global**

`npm install -g painless-link`

**...or as a package dependency**

`npm install --save-dev painless-link`

## Usage

1. Add every dependency which should be resolved as following to your `package.json`:

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
    "postinstall": "painless-link link"
  }
}
```

### Every linked dependency should contain a `package.json`

## Roadmap
Every project can be improved - this also applies to this package 🤓
- make it more painless 😋
- better error handling
- own symlink system, for avoiding collision with existing linked npm packages
- configuration file for extending `painless-link`
- create test cases for node, webpack, etc.
- build CLI interface for more options like verbose mode
- environment specific linking like only linking in `NODE_ENV=development`
