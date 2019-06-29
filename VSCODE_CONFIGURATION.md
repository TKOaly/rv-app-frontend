<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Visual Studio Code configuration guide](#visual-studio-code-configuration-guide)
  - [Recommended plugins](#recommended-plugins)
  - [Optional plugins](#optional-plugins)
  - [Setup](#setup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Visual Studio Code configuration guide

## Recommended plugins

- ESLint
- Prettier

## Optional plugins

- Docker
- Path Intellisense
- Reactjs code snippets
- REST Client
- Sass
- Settings Sync
- yUML

## Setup

1. Install recommended plugins (and optional plugins if you want)
2. Enable Prettier to look for ESLint configuration (and format code according to its configuration):


```
"prettier.eslintIntegration": true
```

3. Enable line wrap:

```
"editor.wordWrap": "on"
```