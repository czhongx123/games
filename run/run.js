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
