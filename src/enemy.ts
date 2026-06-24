import Phaser from "phaser";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite{
    health: number;
    alive: boolean = true;
    invulnerable: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, animation: string) {
        super(scene, x, y, sprite);
        this.alive = true;
        this.health = 10;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play(animation);
    }
     
    abstract update(player: Phaser.Physics.Arcade.Sprite): void;

    takeHit(damage: number) {
        if (this.invulnerable) return;

        this.health -= damage;
        this.setTint(0xff0000);
        if (this.health <= 0) {
            this.die();
            return;
        }

        this.invulnerable = true;

        this.scene.time.delayedCall(100, () => {
            this.invulnerable = false;
            this.clearTint();
        });
    }
    
    die() {
        this.alive = false;
        this.destroy();
    }
}