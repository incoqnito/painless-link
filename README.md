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




## Contribution

Any contribution is highly appreciated - just open a PR containing your changes and we will have a look at it ASAP!

Want to contribute, but don't know what to do? Don't worry, we got you! Have a look at the [roadmap](#roadmap) to find out what's missing. Thanks in advance! 🤩

## Roadmap

Every project can be improved - this also applies to this package 🤓 here is what we have in mind regarding the future of this package:
  - make it easier 😋
  - better error handling
  - own symlink system to avoid collisions with any external usage of `nmp link` (and to avoid permission problems caused by `npm link` due to it linking everything into a global/systemwide folder)
  - configuration file
  - add tests
  - build an advanced CLI for more options e.g. a verbose mode
  - environment specific linking like only linking in `NODE_ENV=development`
