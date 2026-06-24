import Phaser from "phaser";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite{
    health: number;
    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, animation: string) {
        super(scene, x, y, sprite);

        this.health = 10;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play(animation);
    }
     
    abstract update(player: Phaser.Physics.Arcade.Sprite): void;

    takeHit(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }
    
    die() {
        this.destroy();
    }
}