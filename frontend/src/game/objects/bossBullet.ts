import { MainScene } from "../scenes/MainScene";
import { GameObjects } from 'phaser'
import { BossProjectile } from "./bossProjectile";

export class BossBullet extends BossProjectile
{
    constructor(scene : MainScene, angle : number, speed : number)
    {
        const x = scene._boss ? scene._boss.x : 0;
        const y = scene._boss ? scene._boss.y : 0;
        super(scene, x, y, 'bullet_boss');
        this.play('bullet_boss_anim');
        this.rotation = -angle + Math.PI / 2;
        if (this.body != null)
        {
            this.body.velocity.x = speed * Math.cos(-angle);
            this.body.velocity.y = speed * Math.sin(-angle);
        }
    }
}
