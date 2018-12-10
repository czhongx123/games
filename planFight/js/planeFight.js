// 获取Dom对象
let oContent=document.getElementById("content");
let oStart = document.getElementById("start");
let oMain = document.getElementById("main");

//敌机被打掉，显示分数区域
let oScoreLable = document.getElementById("label");
let oEnd = document.getElementById("end");

//游戏结束后，显示总分数区域
let oPlaneScore = document.getElementById("planeScore");
let oScore = document.getElementById("score");


let scores = 0; //总得分

//定义飞机类
class Plane{
    constructor(x,y,speed,imgSrc,boomImgSrc,score,breath,dieTime){
        this.posX=x; //飞机left值
        this.posY=y;//飞机top值
        this.planeSpeed=speed;//飞机正常飞行速度
        this.planeImgSrc=imgSrc;//飞机图片路径
        this.planeBoom=boomImgSrc; //飞机爆炸图片路径
        this.planeStore=score; //飞机分值
        this.planeBreath=breath;//飞机生命力
        this.planeDieTime=dieTime;//飞机消失时间

        this.planeNode = null; //定义飞机节点
        this.planeIsDie = false; //飞机是否击毁
        this.planeDieTimes = 0; //飞机从被击中开始的一个计时器

        this.oMain = document.getElementById("main")

    }

    //初始化
    init(){
        this.planeNode = document.createElement("img");
		this.planeNode.src = this.planeImgSrc;
		this.planeNode.style.left = this.posX + "px";
        this.planeNode.style.top = this.posY + "px";
        this.oMain.appendChild(this.planeNode);
    }

    //移动
    move(){
        if(scores <= 100000) {
            this.planeNode.style.top = this.planeNode.offsetTop + this.planeSpeed + "px";
        } else if(scores > 100000 && scores < 200000) {
            this.planeNode.style.top = this.planeNode.offsetTop + this.planeSpeed + 5 + "px";
        } else {
            this.planeNode.style.top = this.planeNode.offsetTop + this.planeSpeed + 10 + "px";
        }
    }
}
new Plane().init()


//敌方飞机类
class Enemy extends Plane{
    constructor(speed, imgsrc, boomImgSrc, score, breath, dietime){
        super(speed, imgsrc, boomImgSrc, score, breath, dietime)
    }
}


//创建我机类

class MyPlane extends Plane{
    constructor(x,y,speed, imgsrc, boomImgSrc, score, breath, dietime,planeNode){
        super(x,y,speed, imgsrc, boomImgSrc, score, breath, dietime,planeNode)
        this.planeNode=document.createElement("img")
    }
}

//创建我方战机
var myPlane = new MyPlane(127, 488,0, "image/我的飞机.gif", "image/本方飞机爆炸.gif", 0, 1, 600);
console.log(myPlane)
//控制我方飞机移动
oMain.onmousemove = function(e) {
	var evt = e || event;
	var _x = evt.pageX - oContent.offsetLeft - myPlane.planeNode.offsetWidth / 2;
	var _y = evt.pageY - oContent.offsetTop - myPlane.planeNode.offsetHeight / 2;

	if(_x <= 0) {
		_x = 0;
	}
	if(_y <= 0) {
		_y = 0;
	}
	if(_x > oMain.offsetWidth - myPlane.planeNode.offsetWidth) {
		_x = oMain.offsetWidth - myPlane.planeNode.offsetWidth;
	}
	if(_y > oMain.offsetHeight - myPlane.planeNode.offsetHeight) {
		_y = oMain.offsetHeight - myPlane.planeNode.offsetHeight
	}

	myPlane.planeNode.style.left = _x + "px";
	myPlane.planeNode.style.top = _y + "px";
}





//定义子弹类
class Bullet{
    constructor(x, y, imagesrc){
        console.log(imagesrc,'imagesrc')
        this.posX = x;
        this.posY = y;
        
        this.bulletAttach = 1; //子弹攻击力
        this.bulletNode = null; //子弹节点
        this.imagesrc=imagesrc
    }
	
	init(){
        this.bulletNode = document.createElement("img");
		this.bulletNode.src = this.imagesrc;
		this.bulletNode.style.left = this.posX + "px";
		this.bulletNode.style.top = this.posY + "px";
		oMain.appendChild(this.bulletNode);
    }
	move(){
        this.bulletNode.style.top = this.bulletNode.offsetTop - 20 + "px";
    }
}
(new Bullet(parseInt(myPlane.planeNode.style.left) + 31, parseInt(myPlane.planeNode.style.top) - 10, "./image/bullet1.png")).init()


let enemys = []; //保存敌机对象数组
let bullets = []; //保存子弹对象数组

//计数 
let mark = 0;
let mark1 = 0;

//背景变化初值
let bgy = 0;


//开始类
class Start{
    constructor(bgy,oMain,mark,mark1,enemys,bullets){
        this.bgy=bgy;
        this.oMain=oMain;
        this.mark=mark;
        this.mark1=mark1;
        this.enemys=enemys;
        this.bullets=bullets
    }
    start(){
        this.bgy+=this.bgy+1;
        this.oMain.style.backgroundPositionY = this.bgy + "px";
        this.mark++;

        if(this.mark == 20) {
            this.mark1++;
            //中飞机
            if(this.mark1 % 5 == 0) {
                this.enemys.push(new Enemy(2, "image/enemy3_fly_1.png", "image/中飞机爆炸.gif", 3000, 6, 360));
            }
            //大飞机
            if(this.mark1 == 20) {
                this.enemys.push(new Enemy(1, "image/enemy2_fly_1.png", "image/大飞机爆炸.gif", 5000, 12, 540));
                this.mark1 = 0;
            }
            //小飞机
            else {
                this.enemys.push(new Enemy(3, "image/enemy1_fly_1.png", "image/小飞机爆炸.gif", 1000, 1, 240));
            }
            this.mark = 0;
        }

        for(var i = 0; i < this.enemys.length; i++) {
            //如果敌机未被击毁，则移动
            if(this.enemys[i].planeIsDie != true) {
                this.enemys[i].move();
            }
            
            //如果敌机超出边界,删除敌机
            if(this.enemys[i].planeNode.offsetTop > 568) {
                this.oMain.removeChild(this.enemys[i].planeNode);
                this.enemys.splice(i, 1);
            }
    
            //当敌机死亡标记为true时，经过一段时间后清除敌机
            if(this.enemys[i].planeIsDie == true) {
                this.enemys[i].planeDieTimes += 20;
                if(this.enemys[i].planeDieTimes == this.enemys[i].planeDieTime) {
                    this.oMain.removeChild(this.enemys[i].planeNode);
                    this.enemys.splice(i, 1);
                }
            }
        }


        //创建子弹，子弹的位置在我方飞机的中上方
        if(this.mark % 5 == 0) {
            this.bullets.push(new Bullet(parseInt(myPlane.planeNode.style.left) + 31, parseInt(myPlane.planeNode.style.top) - 10, "./image/bullet1.png"));
        }

        //移动子弹
        for(var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move();
            
            //如果子弹超出边界,删除子弹
            if(this.bullets[i].bulletNode.offsetTop < 0) {
                this.oMain.removeChild(this.bullets[i].bulletNode);
                this.bullets.splice(i, 1);
            }
        }


        //碰撞判断
        for(var k = 0; k < this.bullets.length; k++) {
            for(var j = 0; j < this.enemys.length; j++) {
                //判断碰撞本方飞机 
                if(this.enemys[j].planeIsDie == false) {
                    //敌机左边距 + 敌机的宽度 >= 我机的左边距  && 敌机的左边距 <= 我机的左边距 + 我机的宽度
                    if(this.enemys[j].planeNode.offsetLeft + this.enemys[j].planeNode.offsetWidth >= myPlane.planeNode.offsetLeft && this.enemys[j].planeNode.offsetLeft <= myPlane.planeNode.offsetLeft + myPlane.planeNode.offsetWidth) {
                        if(this.enemys[j].planeNode.offsetTop + this.enemys[j].planeNode.offsetHeight >= myPlane.planeNode.offsetTop + 40 && this.enemys[j].planeNode.offsetTop <= myPlane.planeNode.offsetTop - 20 + myPlane.planeNode.offsetHeight) {
                            //碰撞本方飞机，游戏结束，统计分数
                            myPlane.planeNode.src = "image/本方飞机爆炸.gif";
                            oEnd.style.display = "block";
                            oPlaneScore.innerHTML = scores;
                            oMain.onmousemove = null;
                            clearInterval(timer);
                        }
                    }
                    //判断子弹与敌机碰撞
                    if((this.bullets[k].bulletNode.offsetLeft + this.bullets[k].bulletNode.offsetWidth > this.enemys[j].planeNode.offsetLeft) && (this.bullets[k].bulletNode.offsetLeft < this.enemys[j].planeNode.offsetLeft + this.enemys[j].planeNode.offsetWidth)) {
                        if(this.bullets[k].bulletNode.offsetTop <= this.enemys[j].planeNode.offsetTop + this.enemys[j].planeNode.offsetHeight && this.bullets[k].bulletNode.offsetTop + this.bullets[k].bulletNode.offsetHeight >= this.enemys[j].planeNode.offsetTop) {
                            //敌机血量减子弹攻击力
                            this.enemys[j].planeBreath = this.enemys[j].planeBreath - this.bullets[k].bulletAttach;
                            //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                            if(this.enemys[j].planeBreath == 0) {
                                this.scores = this.scores + this.enemys[j].planeScore;
                                oScoreLable.innerHTML = this.scores;
                                this.enemys[j].planeNode.src = this.enemys[j].planeBoom;
                                this.enemys[j].planeIsDie = true;
                            }
                            //删除子弹
                            oMain.removeChild(this.bullets[k].bulletNode);
                            this.bullets.splice(k, 1);
                            break;
                        }
                    }
                }
            }
        }
    }
}



let Timer=null;
function begin() {

	oStart.style.display = "none";
	oMain.style.display = "block";
	oScore.style.display = "block";
	timer = setInterval(new Start().start, 50)
}

function reload(){
	location.reload();
}