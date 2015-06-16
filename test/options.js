var test = require('tap').test;
var Generator = require('../index.js')();

test("append query string", function (t) {
  var generator = Generator.NewFromString('/a/b/:c');
  var string = generator.format({c: 'C'}, {a: 'b'});

  t.equal(string, '/a/b/C?a=b');
  t.end();
});

test("omit ? if query is empty", function (t) {
  var generator = Generator.NewFromString('/a/b/:c');
  var string = generator.format({c: 'C'}, {});

  t.equal(string, '/a/b/C');
  t.end();
});

test("query string is encoded", function (t) {
  var generator = Generator.NewFromString('/');
  var string = generator.format({}, {q: 'a + b / c'});

  t.equal(string, '/?q=a%20%2B%20b%20%2F%20c');
  t.end();
});
