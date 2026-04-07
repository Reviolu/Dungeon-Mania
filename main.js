import { Player } from './player.js'
import { Enemy } from './enemy.js'


let cursors;
let player;

let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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


let game = new Phaser.Game(config)

function preload () {
    this.load.image('background', 'assets/background2.png')
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

    this.load.spritesheet('player_attack1', "assets/player/player_attack1.png", {
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
   this.add.image(0, 0, 'background').setOrigin(0, 0);    
    player = new Player(this, 720, 450, 'player_idle_right');
    cursors = this.input.keyboard.createCursorKeys();


    //enemy animations
    this.anims.create({
        key: 'bat_walk',
        frames: this.anims.generateFrameNumbers('bat_fly', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })   
    let enemy = new Enemy(this, Phaser.Math.Between(1400, 1600), Phaser.Math.Between(700, 800), 'bat_fly', 'bat_walk');
}

function update() {
    player.update(cursors);
    

}