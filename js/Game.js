const overDom = document.querySelector(".over");
class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        //柱子对生成器
        this.pipeProducer = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 16; //移动时间间隔，毫秒
        this.gameOver = false;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            //重新开始游戏
            window.location.reload();
        }
        newTimer = setInterval(() => {
            Go();
        }, 1000);
        this.pipeProducer.startProduce(); //开始生成柱子
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration)
            this.land.move(duration)
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                // console.log(pair.move)
                pair.move(duration);
            })
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
                overDom.classList.remove('hide');
                overDom.classList.add("show");
                clearInterval(newTimer);
            }
        }, this.tick);
    }

    

    isHit(rec1, rec2) {
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        // console.log(disX , (rec1.width + rec2.width) / 2)
        // console.log(centerX1,centerY1,centerX2,centerY2,disX,disY)
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2 ){
            return true;
        }
        return false;
    }

    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
            const pair = this.pipeProducer.pairs[i];
            // console.log(pair.upPipe)
            // console.log(this.isHit(this.bird, pair.upPipe))
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    stop() {
        clearInterval(this.timer);
        clearInterval(newTimer)
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }

    regEvent(){
        window.onkeydown = e => {
            // console.log(e.key)
            if(e.key === "Enter"){
                if(this.timer){
                    this.stop();
                }else{
                    this.start();
                }
            }else if(e.key === " "){
                this.bird.jump();
            }
        }
    }

    
}

var g = new Game();
g.regEvent();