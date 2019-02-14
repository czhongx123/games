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
    },


    /**
     * 检查制定位置可以填写数字n
     */
    checkFillable(matrix,n,rowIndex,colIndex){
        const row=matrix[rowIndex];//获取行数据
        const column=this.makeRow().map((v,i)=>matrix[i][colIndex]);//获取列数据
        const { boxIndex }=boxToolkit.convertToBoxIndex(rowIndex,colIndex);
        const box=boxToolkit.getBoxCells(matrix,boxIndex);

        for(let i=0;i<9;i++){
            if(row[i]==n || column[i]==n || box[i]==n){
                return false;
            }
        }

        return true
    }



};


/**
 * 宫坐标系的工具
 */
const boxToolkit={

    getBoxCells(matrix,boxIndex){
        const startRowIndex=Math.floor(boxIndex/3)*3;
        const startColIndex=boxIndex%3*3;
        const result=[];
        for(let cellIndex=0;cellIndex<9;cellIndex++){
            const rowIndex=startRowIndex+Math.floor(cellIndex/3);
            const colIndex=startColIndex+cellIndex%3;
            result.push(matrix[rowIndex][colIndex]);

        }
        return result;
    },//取出宫的数据


    convertToBoxIndex(rowIndex,colIndex){
        return {
            boxIndex:Math.floor(rowIndex/3)*3+ Math.floor(colIndex/3),
            colIndex:rowIndex % 3 * 3+colIndex % 3
        }
    },

    convertFromBoxIndex(boxIndex,cellIndex){
        return {
            rowIndex:Math.floor(boxIndex/3)*3+ Math.floor(cellIndex/3),
            colIndex:boxIndex % 3 * 3+cellIndex % 3
        }
    }


}

module.exports=class Toolkit{
    static get matrix(){
        return matrixToolkit
    }
    static get box(){
        return boxToolkit
    }
}

