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

  private _scoreText? : Phaser.GameObjects.Text;
  private _gameOverText? : Phaser.GameObjects.Text;

  private _playerIsAlive = true;
  public get PlayerIsAlive() : boolean {
    return this._playerIsAlive;
  }

  public get Ticks() : integer {
    return this._ticks;
  }

  constructor () {
    super({ key: 'MainScene' });
  }

  create() {
    this._boss = new Boss(this);
    this._player = new Player(this, 100, Math.PI);

    this._playerIsAlive = true;
    
    this._cursorKeys = this.input.keyboard?.createCursorKeys();
    //Описание физики
    this._playerBullets = this.physics.add.group();
    this._bossBullets = this.physics.add.group();

    this.physics.add.overlap(this._playerBullets, this._boss, (boss, projectile) => {
      projectile.destroy();
      this._boss?.Damage(this._player?.GetDamage());
    });

    this.physics.add.overlap(this._bossBullets, this._player, (player, projectile) => {
      projectile.destroy();
      this.gameover();
    });

    this._scoreText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height * 0.1, '0', { 
      fontFamily: 'Calibri',
      fontSize: '30px'
    }).setOrigin(0.5, 0.5);
  }

  update(): void {
    this._ticks++;
    if(this.PlayerIsAlive) {
      this.handleKeyboard();
      this.shoot();
    }
    this._boss?.StartAttack();
    if (this._bossBullets)
      for (let i = 0; i < this._bossBullets.getChildren().length; i++)
        this._bossBullets.getChildren()[i].update();
    if(this._scoreText != null) {
      this._scoreText!.text = String(this._boss?.DamageCount);
    }
  }

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

  gameover() : void {
    this._player?.destroy();
    this._playerIsAlive = false;
    this._boss?.StopAttack();
    this._gameOverText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height * 0.4, 'GAME OVER', { 
      fontFamily: 'Calibri',
      fontSize: '60px'
    }).setOrigin(0.5, 0.5);
    const button = this.add.text(this.cameras.main.width / 2, this.cameras.main.height * 0.55, "RESTART",{ 
      fontFamily: 'Calibri',
      fontSize: '30px',
      color: '#201726'
    }).setOrigin(0.5, 0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#FFF' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.restart())
      .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => button.setStyle({ fill: '#201726' }));
  }
}

