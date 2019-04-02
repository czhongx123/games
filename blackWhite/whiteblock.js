var speed =2;
var clock=null;
function init() {
    for(var i=0;i<4;i++){
        createrow();
    }
    clock = window.setInterval('move()', 30);//定时器，每30ms调用一次move（）；
}
function $(id) {
   return document.getElementById(id);//简化函数
}
function creatediv(className) {
   var div=document.createElement("div");//创建div
   div.className=className;
   return div;
}
function createrow() {
    //加入行
    var con=$('content');
    var row=creatediv('div');
    var arr=creatcell();
    con.appendChild(row);
if(con.firstChild==null){
    con.appendChild(row);
}else{
    con.insertBefore(row,con.firstChild)//插入新行
}
for( var i=0;i<4;i++){
    row.appendChild(creatediv(arr[i])); //加入黑白块
}
}
function creatcell() {
    var temp=['space','space','space','space'];
    var i=Math.floor(Math.random()*4);
    temp[i]='space black';//生成黑块
    return temp;
}



function fail() {
    clearInterval(clock);
    confirm('你的最终得分为 ' + parseInt($('score').innerHTML) );
}

$('main').onclick = function(ev){
    judge(ev);
}
function judge(ev){
    if (ev.target.className.indexOf('black') != -1) {
        ev.target.className = 'space';
        ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
        score();
    }else{
        fail();
    }
}
function move(){
    var con = $('content');
    var top = parseInt(window.getComputedStyle(con, null)['top']);//得到top值
//对move进行判断，分三种情况
    if(speed + top > 0){
        top = 0;
    }else{
        top += speed;
    }
    con.style.top = top + 'px';

    if(top == 0){
        createrow();
        con.style.top = '-100px';
        delrow();
    }else if(top == (-100 + speed)){
        var rows = con.childNodes;
        if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){
            fail();
        }
    }
}
function delrow(){
    //删除行
    var con = $('content');
    if(con.childNodes.length == 6) {
        con.removeChild(con.lastChild);
    }
}
function speedup(){
    speed += 2;
    if(speed == 20){
        alert('牛鼻呀！');
    }
}

function score(){
    var newscore = parseInt($('score').innerHTML) + 1;
    $('score').innerHTML = newscore;
    if(newscore % 10 == 0){
        speedup();
    }
}

init();