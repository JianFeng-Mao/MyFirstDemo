const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);
class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500; //重力加速度
        this.maxY = landTop - birdHeight; //小鸟向下运动的最大高度
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }

    render(){
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration){
        super.move(duration);
        this.ySpeed += this.g * duration;
    }

    onMove(){
        if(this.top >= this.maxY){
            this.top = this.maxY;
        }else if(this.top <= 0){
            this.top = 0;
        }
    }

    startSwing(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = this.swingStatus % 3 + 1;
        }, 300);
    }

    stopSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }


    jump(){  //小鸟向上运动
        this.ySpeed = -400;
    }
}

var bird = new Bird();
// setInterval(() => {
//     bird.move(16 / 1000);
// }, 16);