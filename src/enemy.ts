import Phaser from "phaser";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite{
    health: number;
    alive: boolean = true;
    invulnerable: boolean = false;
    knockbacked: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, animation: string) {
        super(scene, x, y, sprite);
        this.alive = true;
        this.health = 10;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play(animation);
    }
     
    abstract update(player: Phaser.Physics.Arcade.Sprite): void;

    takeHit(damage: number, playerX: number, playerY: number) {
        if (this.invulnerable) {
            return;
        }
        console.log("enemy takeHit called, health:", this.health);
        this.health -= damage;
        this.setTint(0xff0000);
        if (this.health <= 0) {
            this.die();
            return;
        }
        console.log("knockback values:", {
            playerX,
            playerY,
            enemyX: this.x,
            enemyY: this.y
        });
        console.log("enemy takeHit called again, health:", this.health);
        let curr_angle = Phaser.Math.Angle.Between(playerX, playerY, this.x, this.y);

        this.setVelocity(Math.cos(curr_angle) * 400, Math.sin(curr_angle) * 400); 
        
        
        this.invulnerable = true;
        this.knockbacked = true;
        this.scene.time.delayedCall(250, () => {
            this.invulnerable = false;
            this.clearTint();
            this.setVelocity(0, 0);
            this.knockbacked = false;
        });
    }
    
    die() {
        this.alive = false;
        this.destroy();
    }
}