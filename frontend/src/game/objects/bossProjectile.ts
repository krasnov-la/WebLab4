import { MainScene } from "../scenes/MainScene";
import { GameObjects } from 'phaser'

export abstract class BossProjectile extends GameObjects.Sprite
{
    private _scene : MainScene;
    constructor(scene : MainScene, x : number, y : number, sprite : string)
    {
        super(scene, x, y, sprite);
        this._scene = scene
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        scene._bossBullets?.add(this);
    }

    public update()
    {
        if (this.y < 0 || this.x < 0 || 
            this.y > this._scene.sys.game.canvas.height || 
            this.x > this._scene.sys.game.canvas.width) this.destroy();
    }
}