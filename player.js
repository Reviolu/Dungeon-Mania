export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, animation) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.sprite = sprite;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play(animation);
    }

    loadAnimations(scene) {
        
    }
}