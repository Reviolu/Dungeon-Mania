import Phaser from "phaser";
import { Enemy } from "./enemy.js";

export class Bat extends Enemy {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bat_fly', 'bat_walk');
    }

    update(Player: Phaser.Physics.Arcade.Sprite) {
        this.scene.physics.moveToObject(this, Player, 100);
    }
}