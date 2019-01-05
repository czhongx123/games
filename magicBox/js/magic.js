

new Promise(
    function(resolve,reject){
        //处理事件

        resolve();//数据处理完成
        reject();//数据处理失败
    }
).then(function A(){
    //成功

},function B(){
    //失败
})


