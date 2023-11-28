import { Scene } from "phaser";
import { Types } from "phaser";
import { Player } from "../objects/player";
import { PlayerBullet } from "../objects/playerBullet";
import { Boss } from "../objects/boss";
import { BossProjectile } from "../objects/bossProjectile";
import { forEachChild } from "typescript";

export class MainScene extends Scene {
    public _player : Player | undefined;
    public _boss : Boss | undefined;
    private _cursorKeys : Types.Input.Keyboard.CursorKeys | undefined;
    public _playerBullets : Phaser.Physics.Arcade.Group | undefined;
    public _bossBullets : Phaser.Physics.Arcade.Group | undefined;
    private _ticks = 0;

    public get Ticks() : integer {
      return this._ticks;
    }

    constructor () {
      super({ key: 'MainScene' });
    }

    create() {
      this._boss = new Boss(this);
      this._player = new Player(this, 100, Math.PI);

      this._cursorKeys = this.input.keyboard?.createCursorKeys();
      //Описание физики
      this._playerBullets = this.physics.add.group();
      this._bossBullets = this.physics.add.group();

      this.physics.add.overlap(this._playerBullets, this._boss, (boss, projectile) => {
        projectile.destroy();
        this._boss?.Damage();
      });

      this.physics.add.overlap(this._bossBullets, this._player, (player, projectile) => {
        projectile.destroy();
        this._player?.damage();
      });
    }

    update(): void {
      this._ticks++;
      this.handleKeyboard();
      this.shoot();
      this._boss?.StartAttack();
      if (this._bossBullets)
        for (let i = 0; i < this._bossBullets.getChildren().length; i++)
          this._bossBullets.getChildren()[i].update();
    }

    /*bossAttack() : void{
      if (this._ticks % 50 != 0) return;
      this._boss?.Attack();
    }*/

    handleKeyboard(): void
    {
      let rad = 0;
      let ang = 0;
      if (this._boss && this._player) this._boss.rotation = this._player.rotation + Math.PI;
      if (this._cursorKeys?.left.isDown) ang -= Math.PI / 100;
      if (this._cursorKeys?.right.isDown) ang += Math.PI / 100;
      if (this._cursorKeys?.up.isDown) rad -= 5;
      if (this._cursorKeys?.down.isDown) rad += 5;
      this._player?.move(rad, ang);
    }

    shoot() : void
    {
      if (this._ticks % 15 != 0) return
      new PlayerBullet(this);
    }
  }

