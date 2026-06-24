import { Player } from './player.js'
import { Enemy } from './enemy.js'
import { Bat } from './bat.js'


let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.ENVELOP,
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
    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.displayWidth = this.scale.width;
    bg.displayHeight = this.scale.height;  

    const player = new Player(this, 720, 450, 'player_idle_right');
    const cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys | undefined;

    this.physics.world.setBounds(190, 65, 1540, 915);
    player.setCollideWorldBounds(true);
    //enemy animations
    this.anims.create({
        key: 'bat_walk',
        frames: this.anims.generateFrameNumbers('bat_fly', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    })   
    
    const enemies: Enemy[] = [];

    this.time.addEvent({
        delay: 5000,
        callback: () => {
            const enemy = new Bat(this, Phaser.Math.Between(1400, 1600), Phaser.Math.Between(700, 800));
            enemies.push(enemy);
            // console.log("after group add:", enemy.visible, enemy.active, enemy.alpha, enemy.x, enemy.y, enemy.body);
            this.physics.add.overlap(player.attackHitBox, enemy, () => {
                enemy.takeHit(player.damage);
                console.log("enemy hit, health:", enemy.health);
            });
            
        },
        callbackScope: this,
        loop: true
    });
    

 
    this.registry.set('player', player);
    this.registry.set('cursors', cursors);
    this.registry.set('enemies', enemies);
}

function update(this: Phaser.Scene) {
    const player = this.registry.get('player') as Player;
    const cursors = this.registry.get('cursors') as Phaser.Types.Input.Keyboard.CursorKeys;
    const enemies = this.registry.get('enemies') as Enemy[];
    player.update(cursors);
    enemies.forEach(enemy => {
        // console.log("enemy is alive: ", enemy.alive);
        if (enemy.alive) {
            enemy.update(player);
        }
    });
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (!enemy) continue;
        if (!enemy.alive) {
            enemies.splice(i, 1);
        }
    }
}


function spawnProceduralEnemy() {

}


