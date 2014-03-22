var test = require('tap').test;
var Tokenizer = require('../index.js')();

test(function (t) {
  var token = Tokenizer.NewFromString('/a/b/:c');
  var string = token.format({c: 'C'});

  t.equal(string, '/a/b/C');
  t.end();
});

test(function (t) {
  var token = Tokenizer.NewFromString('/a/b/:c');

  t.throws(function (){
    token.format({});
  });

  t.end();
});

test(function (t) {
  var token = Tokenizer.NewFromString('/a/b');
  var out = token.format();

  t.equal(out, '/a/b');
  t.end();
});

test(function (t) {
  var token = Tokenizer.NewFromString('/:a/:b');
  var out = token.format({
    a: 'A',
    b: 'B'
  });

  t.equal(out, '/A/B');
  t.end();
});

test(function (t) {
  var token = Tokenizer.NewFromString('/:a/:b');
  var out = token.format({
    a: 'A',
    b: 'B'
  });

  t.ok(token.hasToken('a'));
  t.ok(token.hasToken('b'));
  t.ifError(token.hasToken('c'));

  t.end();
});
