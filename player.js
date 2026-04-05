export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.loadAnimations(scene);
        this.play('player_idle_right');
    }

    loadAnimations(scene) {
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player_run_left', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player_run_right', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'up_right',
            frames: scene.anims.generateFrameNumbers('player_run_right', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'down_right',
            frames: scene.anims.generateFrameNumbers('player_run_right', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'up_left',
            frames: scene.anims.generateFrameNumbers('player_run_left', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'down_left',
            frames: scene.anims.generateFrameNumbers('player_run_left', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        scene.anims.create({
            key: 'idle_right',
            frames: scene.anims.generateFrameNumbers('player_idle_right', {start: 0, end: 5}),
            frameRate: 10,
        })

        scene.anims.create({
            key: 'idle_left',
            frames: scene.anims.generateFrameNumbers('player_idle_left', {start: 0, end: 5}),
            frameRate: 10,
        })

    }
}