# lib-route-tokenizer

[![Build Status](https://travis-ci.org/groundwater/node-lib-route-tokenizer.svg?branch=master)](https://travis-ci.org/groundwater/node-lib-route-tokenizer)

## install

```bash
npm install --save lib-route-tokenizer
```

## usage

```javascript
var Tokenizer = require('lib-route-tokenizer')();
var token     = Tokenizer.NewFromString('/users/:name');

token.format({name: 'bob'});
// /users/bob
```

errors

```javascript
var Tokenizer = require('lib-route-tokenizer')();
var token     = Tokenizer.NewFromString('/users/:name');

token.format({});
// Error: Parameters Missing Key: name
```
