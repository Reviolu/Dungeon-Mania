
var config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 900,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var player;
var game = new Phaser.Game(config)
cursors = this.InputDeviceInfo.keyboard.createCursorKeys();


function preload () {
    this.load.spritesheet('player', "assets/images/player_run.png", {
        frameWidth: 192,
        frameHeight: 192
    });
}

function create() {
    // this.add.sprite(800,450, 'player', 0);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
        frameRate: 10,
        repeat: -1
    })
}

function update() {

}