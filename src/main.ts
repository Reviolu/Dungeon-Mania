import { Player } from './player.js'
import { Enemy } from './enemy.js'
import { Bat } from './bat.js'


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

function preload (this: Phaser.Scene) {
    this.load.image('background', 'assets/background2.png');
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

function create(this: Phaser.Scene) {
    this.add.image(0, 0, 'background').setOrigin(0, 0);  
    const player = new Player(this, 720, 450, 'player_idle_right');
    const cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys | undefined;


    // this.player.body.setCollideWorldBounds(true);

    //enemy animations
    this.anims.create({
        key: 'bat_walk',
        frames: this.anims.generateFrameNumbers('bat_fly', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })   

    const enemies = this.physics.add.group({
        maxSize: 20,
        runChildUpdate: true
    });

    // this.time.addEvent({
    //     delay: 5000,
    //     callback: this.spawnProceduralEnemy,
    //     callbackScope: this,
    //     loop: true
    // });


    const enemy = new Bat(this, Phaser.Math.Between(1400, 1600), Phaser.Math.Between(700, 800));

    this.physics.add.collider(player, enemy, (playerObj, enemyObj) => {
                if (player.invulnerable) {
            return;
        }

        player.health -= 5;
        console.log("hit");
        console.log("health: ", player.health);
        player.invulnerable = true;

        player.setTint(0xff0000);
        this.time.delayedCall(250, () => {
            player.invulnerable = false;
            player.clearTint();
        })});

    
    this.registry.set('player', player);
    this.registry.set('cursors', cursors);

}

function update(this: Phaser.Scene) {
    const player = this.registry.get('player') as Player;
    const cursors = this.registry.get('cursors') as Phaser.Types.Input.Keyboard.CursorKeys;
    player.update(cursors);
    
}


function spawnProceduralEnemy() {

}


