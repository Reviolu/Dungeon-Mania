export class Player extends Phaser.Physics.Arcade.Sprite {
    health: number;
    facingRight: boolean;
    invulnerable: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        scene.physics.add.existing(this);
        this.health = 10;
        this.facingRight = true;
        this.invulnerable = false;
        this.loadAnimations(scene);
        this.play('player_attack1');
        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }

    loadAnimations(scene: Phaser.Scene) {
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

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        let speed = 200;

        this.setVelocity(0);

        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.anims.play('right', true);
            this.facingRight = false;
            this.setFlipX(true)
            console.log(this.facingRight);
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.anims.play('right', true);
            this.setFlipX(false)
            this.facingRight = true;
            console.log("right button,", this.facingRight);
        } 
        else if (cursors.up.isDown) {
            this.setVelocityY(-speed);
            this.anims.play('up_right', true);
            this.setFlipX(!this.facingRight);
        
        } else if (cursors.down.isDown) {
            this.setVelocityY(speed);
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

    takeHit(damage: number) {
        if (this.invulnerable) return;

        this.health -= damage;
        this.setTint(0xff0000);
        if (this.health <= 0) {
            this.die();
            return;
        }

        this.invulnerable = true;

        this.scene.time.delayedCall(350, () => {
            this.invulnerable = false;
            this.clearTint();
        });
        
    }

    attack(damage: number, enemy: Phaser.Physics.Arcade.Sprite) {
        
    }

    die() {
        this.destroy();
    }
}