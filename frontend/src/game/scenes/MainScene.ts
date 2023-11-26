import { Scene } from "phaser";
import { Types } from "phaser";
import { Player } from "../objects/player";
import { PlayerBullet } from "../objects/playerBullet";
import { Bullet } from "../objects/bullet";
import { Boss } from "../objects/boss";

export class MainScene extends Scene {
    public _player : any;
    public _projectiles : Bullet[] = [];
    public _boss : any;
    private _cursorKeys : Types.Input.Keyboard.CursorKeys | undefined;
    private _ticks = 0;
  
    constructor () {
      super({ key: 'MainScene' });
    }

    create() {
      this._boss = new Boss(this);
      this._boss.play('boss_anim');
      this._player = this.physics.add.existing(new Player(this, 100, Math.PI));
      this._cursorKeys = this.input.keyboard?.createCursorKeys();
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
      this._boss.rotation = this._player.rotation + Math.PI;
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