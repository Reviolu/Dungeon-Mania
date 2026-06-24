import Phaser from "phaser";
import { Enemy } from "./enemy";
import { Player } from "./player";

export class Bat extends Enemy {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bat_fly', 'bat_walk');

    }

    update(player: Player) {
        this.scene.physics.moveToObject(this, player, 100);
    // console.log("bat update called", this.x, this.y);
        if (Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y) < 50 && !player.invulnerable) {
            player.takeHit(0);

        }
    }
}