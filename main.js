
var config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var player;
var game = new Phaser.Game(config)



function preload () {
    this.load.spritesheet('player_run_right', "assets/images/player_run_right.png", {
        frameWidth: 192,
        frameHeight: 192
    });

    this.load.spritesheet('player_run_left', "assets/images/player_run_left.png", {
    frameWidth: 192,
    frameHeight: 192
    });

    this.load.spritesheet('player_idle_right', "assets/images/player_idle_right.png", {
        frameWidth: 192,
        frameHeight: 192
    });

    this.load.spritesheet('player_idle_left', "assets/images/player_idle_left.png", {
        frameWidth: 192,
        frameHeight: 192
    });
}

function create() {
    player = this.physics.add.sprite(720, 450, 'player_idle', 0)
    cursors = this.input.keyboard.createCursorKeys();    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player_run_left', {start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player_run_right', {start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player_run_right', {start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player_run_right', {start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'idle_right',
        frames: this.anims.generateFrameNumbers('player_idle_right', {start: 0, end: 5}),
        frameRate: 10,
    })

    this.anims.create({
        key: 'idle_left',
        frames: this.anims.generateFrameNumbers('player_idle_left', {start: 0, end: 5}),
        frameRate: 10,
    })

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } 
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true)
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true)
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('idle_right', true)
    }


}