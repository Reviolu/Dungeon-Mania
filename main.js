import { Enemy } from './enemy.js'

let cursors;
let player;

var config = {
    type: Phaser.AUTO,
    width: 1880,
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


var game = new Phaser.Game(config)

function preload () {
    //player assets
    this.load.spritesheet('player_run_right', "assets/player/player_run_right.png", {
        frameWidth: 192,
        frameHeight: 192
    });

    this.load.spritesheet('player_run_left', "assets/player/player_run_left.png", {
    frameWidth: 192,
    frameHeight: 192
    });

    this.load.spritesheet('player_idle_right', "assets/player/player_idle_right.png", {
        frameWidth: 192,
        frameHeight: 192
    });

    this.load.spritesheet('player_idle_left', "assets/player/player_idle_left.png", {
        frameWidth: 192,
        frameHeight: 192
    });

    //enemy assets
    this.load.spritesheet('bat_fly', "assets/enemy/Bat/Bat_Fly.png", {
        frameWidth: 64,
        frameHeight: 64        
    });
}

function create() {
    player = this.physics.add.sprite(720, 450, 'player_idle_right', 0)
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
        key: 'up_right',
        frames: this.anims.generateFrameNumbers('player_run_right', {start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'down_right',
        frames: this.anims.generateFrameNumbers('player_run_right', {start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'up_left',
        frames: this.anims.generateFrameNumbers('player_run_left', {start: 4, end: 5}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'down_left',
        frames: this.anims.generateFrameNumbers('player_run_left', {start: 4, end: 5}),
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

    //enemy animations
    this.anims.create({
        key: 'bat_walk',
        frames: this.anims.generateFrameNumbers('bat_fly', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })   
    let enemy = new Enemy(this, Phaser.Math.Between(1650, 1800), Phaser.Math.Between(700, 800), 'bat_fly', 'bat_walk');
}

let facingRight = true;
function update() {
    var px = player.body.x
    var py = player.body.y;

    console.log(px, py);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        facingRight = false;
        console.log(facingRight);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);

        facingRight = true;
        console.log("right button,", facingRight);
    } 
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);

        if (facingRight) {
            player.anims.play('up_right', true);
        } else {
            player.anims.play('up_left', true);
        }
        
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        if (facingRight) {
            player.anims.play('down_right', true);
        } else {
            player.anims.play('down_left', true);
        }
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        console.log("idle", facingRight);
        if (facingRight == true) {
            player.anims.play('idle_right', true)
        } else {
            player.anims.play('idle_left', true);
        }


    }





}