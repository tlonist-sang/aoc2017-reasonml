// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

var arr = Fs.readFileSync("input/q16in.txt", "utf8").split(",");

var original = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p"
];

function solve(arr, _original, _index) {
  while(true) {
    var index = _index;
    var original = _original;
    var v = Belt_Array.get(arr, index);
    if (v === undefined) {
      return ;
    }
    if (v.startsWith("x")) {
      var key = v.substr(1);
      var keyArr = Belt_Array.map(key.split("/"), Caml_format.caml_int_of_string);
      var v$1 = Belt_Array.get(keyArr, 0);
      if (v$1 !== undefined) {
        var w = Belt_Array.get(keyArr, 1);
        if (w !== undefined) {
          var temp = original[v$1];
          original[v$1] = original[w];
          original[w] = temp;
        }
        
      }
      _index = index + 1 | 0;
      continue ;
    }
    if (v.startsWith("s")) {
      var key$1 = Caml_format.caml_int_of_string(v.substr(1));
      var original1 = original.slice(key$1);
      var original2 = original.slice(0, key$1);
      var newOriginal = original1.concat(original2);
      _index = index + 1 | 0;
      _original = newOriginal;
      continue ;
    }
    var key$2 = v.substr(1);
    var keyArr$1 = key$2.split("/");
    var temp1 = keyArr$1[0];
    var temp2 = keyArr$1[1];
    var go = (function(keyArr$1,temp1,temp2){
    return function go(input, index) {
      var v = Belt_Array.get(input, index);
      if (v !== undefined) {
        if (v === keyArr$1[0]) {
          input[index] = temp2;
          return ;
        } else if (v === keyArr$1[1]) {
          input[index] = temp1;
          return ;
        } else {
          return ;
        }
      }
      
    }
    }(keyArr$1,temp1,temp2));
    go(original, 0);
    _index = index + 1 | 0;
    continue ;
  };
}

solve(arr, original, 0);

console.log(original);

exports.arr = arr;
exports.original = original;
exports.solve = solve;
/* arr Not a pure module */
