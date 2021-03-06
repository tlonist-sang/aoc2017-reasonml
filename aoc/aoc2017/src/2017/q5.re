open Belt;

let arr = 
    Node_fs.readFileAsUtf8Sync("input/q5in.txt")
    ->Js.String2.trim
    ->Js.String2.split("\n")
    ->Array.map(int_of_string);

let len = Array.length(arr);
let pos = ref(0);
let something = -112;

let getJump = (arr, pos):int => {
   switch(arr[pos^]){
       | Some(e) => e;
       | None => 0
   }
}

let rec part1 = (arr, pos, step) => {
    if(pos^ >= len || pos^ < 0){
        step;
    }else{
        let cur = pos^;
        let jump = getJump(arr, pos);
        pos := jump + pos^;
        Js.Array.unsafe_set(arr, cur, jump+1);    
                
        part1(arr, pos, step+1);
    }
}


let rec part2 = (arr, pos, step) => {
    if(pos^ >= len || pos^ < 0){
        step;
    }else{
        let cur = pos^;
        let jump = getJump(arr, pos);
        pos := jump + pos^;
        
        if(jump >= 3){
            Js.Array.unsafe_set(arr, cur, jump-1);    
        }else{
            Js.Array.unsafe_set(arr, cur, jump+1);    
        }        
        part2(arr, pos, step+1);
    }
}

Js.log(part1(arr, pos, 0));


/**
 * - Belt.Array 와 Array의 차이
 * - 함수가 전역변수에 의존하지 않아야 하는 이유
 * - Array set과 get은 Array를 이용
 * - ref로 가변 변수를 정의하고 a^ get, a:= 로 set할 수 있음
 */