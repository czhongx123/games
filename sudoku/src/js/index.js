const Grid=require("./ui/grid");
const PopupNumbers = require('./ui/popupnumbers');

const grid=new Grid($("#container"));
grid.build();
grid.layout();//调整宽高和样式



const popupNumbers=new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers)



//绑定按钮

$('#check').on("click",e=>{ 
    if(grid.check()){
        alert('成功');
    }
  
});
$('#reset').on("click",e=>{
    grid.reset();
 });
$('#clear').on("click",e=>{
    grid.clear();
 });
$('#rebuild').on("click",e=>{
    grid.rebuild();
 });

