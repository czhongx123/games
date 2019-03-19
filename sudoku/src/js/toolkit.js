const matrixToolkit={
    makeRow(v=0){
        const array=new Array(9);
        array.fill(v);
        return array
    },//生成行
    
    
    makeMatrix(v=0){
        return Array.from({length:9},()=>this.makeRow(v))
    },//生成二维数组
    
    
    
    
    /**
     * 生成洗牌算法
     */
    shuffle(array){
        const endIndex=array.length-2;
        for(let i=0;i<=endIndex;i++){
            const j=i+Math.floor(Math.random()*(array.length-i));
            [array[i],array[j]]=[array[j],array[i]]
        }
        return array
    }
}
module.exports=matrixToolkit;