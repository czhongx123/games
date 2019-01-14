/**
 * 
 * {
 *  el:"#container",
 *  speed:100（默认），
 * direction:left(默认)，
 * data:['哈哈哈哈哈','快快快看']
 * }
 *
 *
 * @param {*} option
 */

function run(option){
    let el=option.el;
    let speed= '50'||option.speed;
    let direction='left'|| option.direction;
    let data=option.data;
    let str='';
    for(let i=0;i<data.length;i++){
        str+='<p class="pcs">'+data[i]+'</p>'
    }
    console.log(el)
    document.getElementById(el).innerHTML=str;
    document.getElementById(el).style.position='relative';
    // for(let j=0;j<document.getElementsByClassName('pcs').length;j++){
    //     document.getElementsByClassName('pcs')[j].style.marginRight="200px";
    //     document.getElementsByClassName('pcs')[j].style.position="absolute";
    // }



}
run({
    el:'container',
    data:['哈哈哈哈哈','快快快看']
})


var stu = [
    {
        name: '旺儿',
        gender: '男',
        age: 21
    },
    {
        name: '狗剩',
        gender: '男',
        age: 22
    },
    {
        name: '小华',
        gender: '男',
        age: 23
    },
    {
        name: '李四',
        gender: '女',
        age: 25
    },
    {
        name: '李四',
        gender: 'nv',
        age: 26
    }
]
var codeinfo=stu.find((ele)=>(
    ele.name=="小华"
))

// console.log(codeinfo)
// console.log(codeinfo.age)

// const aa=(els)=>(els)
// console.log(aa(22))

function workDay(data){
    var day=new Date(data).getDay();
    if(day/6==1 || day==0){
        return false;
    }else{
        return true;
    }
}
console.log(workDay('2019-01-26'))


