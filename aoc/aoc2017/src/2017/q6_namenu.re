open Belt;

let input =
  Node_fs.readFileAsUtf8Sync("input/q6in.txt")
  ->Js.String2.trim
  ->Js.String2.split("\t")
  ->Array.map(Pervasives.int_of_string);

let distributeUnsafe = banks => {
  let i = Garter.Array.maxIndex(banks);
  let length = Array.length(banks);
  let blocks = Array.getUnsafe(banks, i);
  Array.setUnsafe(banks, i, 0);
  let rec f = (blocks, j) =>
    if (blocks > 0) {
      Garter.Array.updateUnsafe(banks, j, (+)(1));
      f(blocks - 1, (j + 1) mod length);
    } else {
      banks;
    };
  f(blocks, (i + 1) mod length);
};

// [|0, 2, 7, 0|]->distributeUnsafe->Js.log; // => (2, 4)

module IntArrayCmp =
  Id.MakeComparable({
    type t = array(int);
    let cmp = Pervasives.compare;
  });

let findDupe = s => {
  let rec go = (history, idx) => {
    let v = Stream.next(s);
    switch (history->Map.get(v)) {
    | None => go(history->Map.set(v, idx), idx + 1)
    | Some(prevIdx) => Some((prevIdx, idx))
    };
  };

  go(Map.make(~id=(module IntArrayCmp)), 0);
};

// [[|0|], [|2|], [|3|], [|1|], [|3|], [|4|]]
// ->Stream.of_list
// ->findDupe
// ->Js.log;

let bankStream = init => {
  let state = ref(init);
  let next = _ => {
    let state' = Array.copy(state^);
    state := distributeUnsafe(state^);
    Some(state');
  };
  Stream.from(next);
};

// bankStream([|0, 2, 7, 0|])->Stream.npeek(10, _)->List.toArray->Js.log;

let (from, to_) = bankStream(input)->findDupe->Option.getExn;

Js.log(to_);
Js.log(to_ - from);
