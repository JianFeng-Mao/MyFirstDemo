/**
 *  属性： width height left top xSpeed ySpeed dom
 *
 * @class Rectangle
 */
class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    render() {
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
    }
    move(duration) {
        let xDic = this.xSpeed * duration;
        let yDic = this.ySpeed * duration;
        this.left += xDic;
        this.top += yDic;

        if (this.onMove) {
            this.onMove();
        }

        this.render();
    }
}