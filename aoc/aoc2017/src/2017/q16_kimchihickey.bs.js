// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_splice_call = require("bs-platform/lib/js/caml_splice_call.js");

var input = Fs.readFileSync("input/day16.txt", "utf8");

function $$parseInt(p) {
  return Belt_Option.getWithDefault(Belt_Option.map(p, Caml_format.caml_int_of_string), 0);
}

function parseString(p) {
  return Belt_Option.getWithDefault(Belt_Option.map(p, (function (prim) {
                    return prim.trim();
                  })), "");
}

function parse(str) {
  var command = str[0];
  var param = str.slice(1).split("/");
  var p1 = Belt_Array.get(param, 0);
  var p2 = Belt_Array.get(param, 1);
  switch (command) {
    case "p" :
        return {
                TAG: /* Partner */2,
                _0: parseString(p1),
                _1: parseString(p2)
              };
    case "s" :
        return {
                TAG: /* Spin */0,
                _0: $$parseInt(p1)
              };
    case "x" :
        return {
                TAG: /* Exchange */1,
                _0: $$parseInt(p1),
                _1: $$parseInt(p2)
              };
    default:
      return ;
  }
}

var commands = Belt_Array.keepMap(input.split(/,/), (function (s) {
        return Belt_Option.map(s, parse);
      }));

function spin(programs, n) {
  var l = programs.length;
  return Belt_Array.concat(Belt_Array.slice(programs, l - n | 0, n), Belt_Array.slice(programs, 0, l - n | 0));
}

function exchange(programs, p1, p2) {
  var v1 = Belt_Option.getWithDefault(Belt_Array.get(programs, p1), "");
  var v2 = Belt_Option.getWithDefault(Belt_Array.get(programs, p2), "");
  Belt_Array.set(programs, p1, v2);
  Belt_Array.set(programs, p2, v1);
  return programs;
}

function partner(programs, p1, p2) {
  var findIndex = function (programs, x) {
    return Belt_Option.getWithDefault(Belt_Array.getIndexBy(programs, (function (v) {
                      return v === x;
                    })), 0);
  };
  var i = findIndex(programs, p1);
  var j = findIndex(programs, p2);
  return exchange(programs, i, j);
}

function move(programs, command) {
  switch (command.TAG | 0) {
    case /* Spin */0 :
        return spin(programs, command._0);
    case /* Exchange */1 :
        return exchange(programs, command._0, command._1);
    case /* Partner */2 :
        return partner(programs, command._0, command._1);
    
  }
}

function join(strArray) {
  return Caml_splice_call.spliceObjApply("", "concat", [strArray]);
}

console.log(Caml_splice_call.spliceObjApply("", "concat", [partner(exchange(spin([
                        "a",
                        "b",
                        "c",
                        "d",
                        "e"
                      ], 1), 3, 4), "e", "b")]));

var initPrograms = [
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

console.log(Caml_splice_call.spliceObjApply("", "concat", [Belt_Array.reduce(commands, initPrograms, (function (p, c) {
                  return Belt_Option.mapWithDefault(c, p, (function (param) {
                                return move(p, param);
                              }));
                }))]));

var test;

exports.input = input;
exports.$$parseInt = $$parseInt;
exports.parseString = parseString;
exports.parse = parse;
exports.commands = commands;
exports.spin = spin;
exports.exchange = exchange;
exports.partner = partner;
exports.move = move;
exports.join = join;
exports.test = test;
exports.initPrograms = initPrograms;
/* input Not a pure module */
