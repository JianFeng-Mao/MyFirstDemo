const gameDom = document.querySelector(".game");
const gameStyles = getComputedStyle(gameDom);
const gameWidth = parseFloat(gameStyles.width);
// console.log(gameWidth)

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        // console.log(height)
        super(52, height, gameWidth, top, speed, 0, dom);
        // console.log(gameWidth)
    }
    onMove() {
        if (this.left <= -this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 生成水管对
 *
 * @class PipePare
 */
class PipePare {
    constructor(speed) {
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.spaceHeight - this.minHeight;

        const upHeight = getRandom(this.minHeight, this.maxHeight);
        // console.log(upHeight)
        const upDom = document.createElement("div");
        upDom.className = "pipe up";
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);
        


        const downHeight = landTop - upHeight - this.spaceHeight;
        // console.log(downHeight)
        const downTop = upHeight + this.spaceHeight;
        const downDom = document.createElement("div");
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);
    

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
        // console.log(this.upPipe.width)
    }

    useless() { //判断水管对是否移除视野
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) {
        // console.log("11")
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        // this.pairs.push(new PipePare(this.speed));
        // console.log(this.pairs)
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            // console.log(this.pairs)
            for (let i = 0; i < this.pairs.length; i++) {
                //移除没用的水管对
                // console.log(this.pairs[i])
                var pair = this.pairs[i];
                if (pair.useless()) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick);
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

// var producer = new PipePareProducer(-100);
// producer.startProduce();
// setInterval(() => {
//     producer.pairs.forEach(pair => {
//         pair.move(16 / 1000);
//     })
// }, 16)