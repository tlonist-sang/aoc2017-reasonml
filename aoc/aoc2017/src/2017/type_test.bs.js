// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Set = require("bs-platform/lib/js/set.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

function compare(t1, t2) {
  return Caml_primitive.caml_string_compare(t1.name, t2.name);
}

var A = {
  compare: compare
};

var ASet = $$Set.Make(A);

exports.A = A;
exports.ASet = ASet;
/* ASet Not a pure module */
