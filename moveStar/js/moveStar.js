class Man{
    constructor(){
        this.bottom='0';
    }
    create(){
        let aDiv=document.createElement('div');
        aDiv.className='man';
        aDiv.style.bottom=this.bottom
        document.getElementById('container').appendChild(aDiv)
    }
    
}
let man=new Man()
man.create()
