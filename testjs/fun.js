
const items =[
    {book:"bookone",age:90},
    {book:"booktwo",age:90},
    {book:"bookthree",age:90},
    {book:"bookour",age:90},
];
const funone = (one ,two) =>{
    return one +two;
}

const funtwo = (one ,two) =>{
    return one +two;
}
const one = items.length* 1;

let result =funtwo(one,23)+funone(one,23);

console.log(one)

console.log(result)


