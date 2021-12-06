const context = {};

function defineGetter(target,key) {
  context.__defineGetter__(key,function () {
    return this[target][key];
  })
};

function defineSetter(target,key) {
  context.__defineSetter__(key,function (val) {
    this[target][key] = val;
  })
};

defineGetter('request','path');
defineGetter('request','url')
defineGetter('request','query');

defineGetter('response','body');
defineSetter('response','body')


module.exports = context;