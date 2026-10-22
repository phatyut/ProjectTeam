const page =[
    {name:"testingone",age:90},
    {name:"testingtwo",age:92},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
    {name:"testingthree",age:93},
]
// let  phone ={...page}; 
// let newvalue =0

// for(let  f in page ){
//     newvalue+=f
// }
// console.log(phone)
// console.log(newvalue)
console.log(page.length)

let conditions = ""
 
if(page.length > 3){
    console.log("large")
}else{
    conditions="small";
}
const countpage = page.length;

const  testingCounter =( one,two,three)=>{
   console.log("function testing ")

}
testingCounter()
// console.log(testingCounter(12,1,2))

console.log(conditions)

switch(conditions){
    case 'small':{
        break;
    }case 'min':{
        console.log('position two is working ');
        break;
    }case 'large':{
        console.log("block three is working");
        break;
    }default:{
        console.log("Not Match!")
        break;
    }
}