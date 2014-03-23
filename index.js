"use strict";

function Generator() {
  this.generators   = [];
  this.segments = [];
}

Generator.prototype.hasToken = function hasToken(generator) {
  return (this.indexOf(generator) >= 0);
};

Generator.prototype.indexOf = function indexOf(generator) {
  return (this.generators.indexOf(generator));
};

Generator.prototype.format = function format(params) {
  return this.segments.map(function(segment){
    return segment(params);
  }).join('/');
};

Generator.NewEmpty = function NewEmpty() {
  var t = new Generator();
  return t;
};

Generator.NewFromString = function NewFromString(string) {
  var generator = this.NewEmpty();
  var split = string.split('/');
  split.forEach(function (segment) {
    var isToken = segment[0] === ':';

    if (isToken) {
      var segName = segment.substr(1);
      generator.generators.push(segName);
      generator.segments.push(function (params) {
        var param = params[segName];

        if (param === undefined) throw new Error('Parameters Missing Key: ' + segName);

        return param;
      });
    }
    else generator.segments.push(function () {
        return segment;
      }
    );
  });

  return generator;
};

function inject(deps) {
  return Object.create(Generator, deps);
}

function defaults() {
  var deps = {

  };
  return inject(deps);
}

module.exports = function INIT(deps) {
  if (typeof deps === 'object') return inject(deps);
  else if (deps === undefined)  return defaults();
  else                          throw new Error('injection error');
};
