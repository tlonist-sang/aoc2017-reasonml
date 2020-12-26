// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Stream = require("bs-platform/lib/js/stream.js");

var init = {
  contents: 1
};

function limitFilter(s) {
  var _param;
  while(true) {
    var v = Stream.next(s);
    console.log("v=>", v);
    if (v.contents >= 100) {
      console.log("Reached 100!");
      return ;
    }
    _param = undefined;
    continue ;
  };
}

function numberStream(input) {
  return Stream.from(function (param) {
              input.contents = input.contents + 1 | 0;
              return input;
            });
}

console.log(limitFilter(numberStream(init)));

console.log(undefined);

var answer;

exports.init = init;
exports.limitFilter = limitFilter;
exports.numberStream = numberStream;
exports.answer = answer;
/*  Not a pure module */
