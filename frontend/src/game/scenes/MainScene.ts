import { Scene } from "phaser";
import { Types } from "phaser";
import { Player } from "../objects/player";
import { PlayerBullet } from "../objects/playerBullet";
import { Bullet } from "../objects/bullet";

export class MainScene extends Scene {
    public _player : any;
    public _projectiles : Bullet[] = [];
    private _cursorKeys : Types.Input.Keyboard.CursorKeys | undefined;
    private _ticks = 0;
  
    constructor () {
      super({ key: 'MainScene' });
    }

    create() {
      this._player = this.physics.add.existing(new Player(this, 100, Math.PI));
      this._cursorKeys = this.input.keyboard?.createCursorKeys();
      // this.anims.create({
      //     key: "ring_anim",
      //     frames: this.anims.generateFrameNumbers('ring'),
      //     frameRate: 30,
      //     repeat: -1 
      // });

      // this._player.play("ring_anim");
    }

    update(time: number, delta: number): void {
      this._ticks++;
      this.handleKeyboard();
      this.shoot();
    }

    handleKeyboard()
    {
      let rad = 0;
      let ang = 0;
      if (this._cursorKeys?.left.isDown) ang += Math.PI / 128;
      if (this._cursorKeys?.right.isDown) ang -= Math.PI / 128;
      if (this._cursorKeys?.up.isDown) rad += 5;
      if (this._cursorKeys?.down.isDown) rad -= 5;
      this._player?.Move(rad, ang);
    }

    shoot()
    {
      if (this._ticks % 10 == 0) 
      {
        const bullet = new PlayerBullet(this);
        bullet.play('bullet_anim');
      }

      this._projectiles.forEach(element => {
        element.Move();
      });
    }
  }