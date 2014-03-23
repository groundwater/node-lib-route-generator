# lib-route-generator

[![Build Status](https://travis-ci.org/groundwater/node-lib-route-generator.svg?branch=master)](https://travis-ci.org/groundwater/node-lib-route-generator)

## install

```bash
npm install --save lib-route-generator
```

## usage

```javascript
var Generator = require('lib-route-generator')();
var generator = Generator.NewFromString('/users/:name');

generator.format({name: 'bob'});
// /users/bob
```

errors

```javascript
var Generator = require('lib-route-generator')();
var generator = Generator.NewFromString('/users/:name');

generator.format({});
// Error: Parameters Missing Key: name
```

## see also

- [lib-route-matcher](https://github.com/groundwater/node-lib-route-matcher)
  client side library for generating routes from a matcher
