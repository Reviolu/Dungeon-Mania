export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        scene.physics.add.existing(this);
        this.health = 100;
        this.facingRight = true;
        this.loadAnimations(scene);
        this.play('player_attack1');
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

        scene.anims.create({
            key: 'player_attack1',
            frames: scene.anims.generateFrameNumbers('player_attack1', {start: 0, end: 5}),
            frameRate: 8,
            repeat: -1
        });


    }

    update(cursors) {
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('right', true);
            this.facingRight = false;
            this.setFlipX(true)
            console.log(this.facingRight);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('right', true);
            this.setFlipX(false)
            this.facingRight = true;
            console.log("right button,", this.facingRight);
        } 
        else if (cursors.up.isDown) {
            this.setVelocityY(-160);
            this.anims.play('up_right', true);
            this.setFlipX(!this.facingRight);
        
        } else if (cursors.down.isDown) {
            this.setVelocityY(160);
            this.anims.play('down_right', true);
            this.setFlipX(!this.facingRight);
        
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            console.log("idle", this.facingRight);
         if (this.facingRight == true) {
                this.setFlipX(false)
                this.anims.play('player_attack1', true)
            } else {
                this.setFlipX(true)
                this.anims.play('player_attack1', true);
            }
        }
    }
}