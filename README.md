| Issues | License |  NPM  |
|--------|---------|-------|
[![Github Issues](https://img.shields.io/github/issues/wherewhere/hexo-generator-wayback)](https://github.com/wherewhere/hexo-generator-wayback/issues)|[![License](https://img.shields.io/github/license/wherewhere/hexo-generator-wayback)](https://github.com/wherewhere/hexo-generator-wayback/blob/main/LICENSE)|[![NPM Status](https://img.shields.io/npm/dt/hexo-generator-wayback.svg?style=flat)](https://www.npmjs.com/package/hexo-generator-wayback)

# 🏛 hexo-generator-wayback
Generate and upload Hexo posts to Wayback Machine.

## Install
```sh
npm install hexo-generator-wayback --save
```

## Configuration

### Generator
```yml
enable: true
extensions: [".html", ".json"] # The file extensions to be archived
output: wayback.csv # The output file name
```

### Deploy
```yml
deploy:
  - type: wayback_machine
```

## Manual

```sh
npx hexo-generator-wayback $Output_URL
```