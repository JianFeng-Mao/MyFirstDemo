const skyDom = document.querySelector(".sky");
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = skyStyles.height;
class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
    }

    onMove() {    
        if (this.left <= -(this.width / 2)) {
            this.left = 0;
        }
    }

}

var sky = new Sky();
console.log(sky)
setInterval(() => {
    sky.move(16 / 1000);
}, 16);