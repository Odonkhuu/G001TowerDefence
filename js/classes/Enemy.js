
class Enemy extends Sprite {
    constructor({ position = {x: 0, y: 0}}) {
        super({position, imageSrc: './img/orc.png', frames: {max: 7}})
        this.position = position;
        this.width = 100;
        this.height = 100;
        this.wayPointIndex = 0;
        this.color = 'red';
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.radius = 50;
        this.health = 100;
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        super.draw()

        // Health bar
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y - 15, this.width, 10);

        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100, 10);
    }

    update() {
        this.draw();
        super.update();
        
        const wayPoint = wayPoints[this.wayPointIndex];
        const yDistance = wayPoint.y - this.center.y;
        const xDistance = wayPoint.x - this.center.x;
        const angle = Math.atan2(yDistance, xDistance);
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        const speed = 20;
        
        this.velocity.x = Math.cos(angle) * speed;
        this.velocity.y = Math.sin(angle) * speed;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(
            Math.abs(Math.round(this.center.x) - Math.round(wayPoint.x)) < Math.abs(this.velocity.x) && 
            Math.abs(Math.round(this.center.y) - Math.round(wayPoint.y)) < Math.abs(this.velocity.y) &&
            this.wayPointIndex < wayPoints.length - 1
        ) {
            this.wayPointIndex ++;
        }
    }
}
