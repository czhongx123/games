// function htmlEncode ( str ) {  
//     var ele = document.createElement('span');  
//     ele.appendChild( document.createTextNode( str ) );  
//     return ele.innerHTML;  
//   } 

// var  aa="<a href='www.baidu.com'></a></br>"

// console.log(htmlEncode(aa))
// console.log(encodeURI(aa))
// console.log(decodeURI(encodeURI(aa)))

// var aa=document.getElementById("hh");
// aa.onclick=function(){
//   console.log(11111111111)
// }


// setInterval(function(){
//   var aa=document.getElementById("hh");
//   aa.onclick()
// },1000)

var a='{rename:2018,worday:0}'
var b=JSON.stringify(a);
console.log(b)
var c=JSON.parse(b)
console.log(typeof c)