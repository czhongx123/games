const Grid=require("./ui/grid");

const grid=new Grid($("#container"));
grid.build();
grid.layout();//调整宽高和样式
