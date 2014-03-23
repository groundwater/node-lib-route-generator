var test = require('tap').test;
var Generator = require('../index.js')();

test(function (t) {
  var generator = Generator.NewFromString('/a/b/:c');
  var string = generator.format({c: 'C'});

  t.equal(string, '/a/b/C');
  t.end();
});

test(function (t) {
  var generator = Generator.NewFromString('/a/b/:c');

  t.throws(function (){
    generator.format({});
  });

  t.end();
});

test(function (t) {
  var generator = Generator.NewFromString('/a/b');
  var out = generator.format();

  t.equal(out, '/a/b');
  t.end();
});

test(function (t) {
  var generator = Generator.NewFromString('/:a/:b');
  var out = generator.format({
    a: 'A',
    b: 'B'
  });

  t.equal(out, '/A/B');
  t.end();
});

test(function (t) {
  var generator = Generator.NewFromString('/:a/:b');
  var out = generator.format({
    a: 'A',
    b: 'B'
  });

  t.ok(generator.hasToken('a'));
  t.ok(generator.hasToken('b'));
  t.ifError(generator.hasToken('c'));

  t.end();
});
