import { Scene } from "phaser";
import { MainScene } from "./MainScene";
import ship from "src/assets/ship.png";
import bullet from "src/assets/beam.png";

export class PreloadScene extends Scene {
    constructor () {
      super({ key: 'PreloadScene' })
    }

    preload() {
        this.load.image('ship', ship);
        this.load.spritesheet('bullet', bullet, {
          frameHeight : 16,
          frameWidth : 16
        });
    }

    create() {
        this.anims.create({
          key : 'bullet_anim',
          frames : this.anims.generateFrameNumbers('bullet'),
          frameRate : 4,
          repeat : -1
        });

        this.scene.run('MainScene');
    }
  }