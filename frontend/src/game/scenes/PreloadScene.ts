import {Scene} from "phaser";
import {MainScene} from "./MainScene";
import ship from "src/assets/ship.png";
import bullet from "src/assets/beam.png";
import bullet_boss from "src/assets/beam_enemy.png"
import boss from "src/assets/spritesheet.png"

//sounds
import gameoverSound from "src/assets/sounds/gameover.wav";
import ingameSound from "src/assets/sounds/ingame.wav";
import menuSound from "src/assets/sounds/menu.wav";
import shootSound from "src/assets/sounds/shoot.wav";

//patterns sounds
import chaosPatternSound from "src/assets/sounds/chaosPattern.wav";
import ringPatternSound from "src/assets/sounds/ringPattern.wav";
import spiralPatternSound from "src/assets/sounds/spiralPattern.wav";

export class PreloadScene extends Scene {
  constructor() {
    super({key: 'PreloadScene'})
  }

  preload() {
    this.load.image('ship', ship);
    this.load.spritesheet('bullet', bullet, {
      frameHeight: 16,
      frameWidth: 16
    });
    this.load.spritesheet('bullet_boss', bullet_boss, {
      frameHeight: 16,
      frameWidth: 16
    });
    this.load.spritesheet('boss', boss, {
      frameHeight: 57,
      frameWidth: 60
    });

    this.load.audio('gameoverSound', gameoverSound);
    this.load.audio('ingameSound', ingameSound);
    this.load.audio('menuSound', menuSound);
    this.load.audio('shootSound', shootSound);

    this.load.audio('chaosPatternSound', chaosPatternSound);
    this.load.audio('ringPatternSound', ringPatternSound);
    this.load.audio('spiralPatternSound', spiralPatternSound);
  }

  create() {
    this.anims.create({
      key: 'bullet_anim',
      frames: this.anims.generateFrameNumbers('bullet'),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'bullet_boss_anim',
      frames: this.anims.generateFrameNumbers('bullet_boss'),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create(
      {
        key: 'boss_anim',
        frames: this.anims.generateFrameNumbers('boss'),
        frameRate: 20,
        repeat: -1
      }
    );

    this.scene.run('MainScene');
  }
}
