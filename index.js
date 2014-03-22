function Tokenized() {
  this.tokens   = [];
  this.segments = [];
}

Tokenized.prototype.hasToken = function hasToken(token) {
  return (this.indexOf(token) >= 0);
};

Tokenized.prototype.indexOf = function indexOf(token) {
  return (this.tokens.indexOf(token));
};

Tokenized.prototype.format = function format(params) {
  return this.segments.map(function(segment){
    return segment(params);
  }).join('/');
};

Tokenized.NewEmpty = function NewEmpty() {
  var t = new Tokenized();
  return t;
};

Tokenized.NewFromString = function NewFromString(string) {
  var token = this.NewEmpty();
  var split = string.split('/');
  split.forEach(function (segment) {
    var isToken = segment[0] === ':';

    if (isToken) {
      var segName = segment.substr(1);
      token.tokens.push(segName);
      token.segments.push(function (params) {
        var param = params[segName];

        if (param === undefined) throw new Error('Parameters Missing Key: ' + segName);

        return param;
      });
    }
    else token.segments.push(function () {
      return segment;
    });
  });

  return token;
};

function inject(deps) {
  return Object.create(Tokenized, deps);
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
