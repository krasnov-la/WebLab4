import { MainScene } from "../scenes/MainScene";
import { GameObjects } from 'phaser'

export class PlayerBullet extends GameObjects.Sprite
{
    constructor(scene : MainScene)
    {
        const x = scene._player ? scene._player.x : 0;
        const y = scene._player ? scene._player.y : 0;
        super(scene, x, y, 'bullet');
        this.play('bullet_anim');
        this.scale = 1.5;
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        const player = scene._player;

        scene._playerBullets?.add(this);
        if (this.body && player)
        {
            this.rotation = player.rotation - Math.PI / 2;
            this.body.velocity.x = (-player.x + scene.sys.game.canvas.width / 2) / player.rad * 150;
            this.body.velocity.y = (-player.y + scene.sys.game.canvas.height / 2) / player.rad * 150;
        }
    }
}
