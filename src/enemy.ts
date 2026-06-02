import Phaser from "phaser";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite{
    health: number;
    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, animation: string) {
        super(scene, x, y, sprite);

        this.health = 10;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);

        this.play(animation);
    }
}