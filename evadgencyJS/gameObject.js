
export class GameObject {
    constructor(sx, sy, srcW, srcH, x, y, spd, width, height, image = '../sprites/spritesheet.png') {

        let img = new Image();
        img.src = image;

        this.sprite = img;
        this.sx = sx;
        this.sy = sy;
        this.srcW = srcW;
        this.srcH = srcH;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.spd = spd;
 
    } 
}
console.log();