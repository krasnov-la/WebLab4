import { MainScene } from "../scenes/MainScene";
import { Bullet } from "./bullet"

export class PlayerBullet extends Bullet
{
    constructor(scene : MainScene)
    {
        super(scene);
        this
    }

    public override Move()
    {
        this._radius -= 2;
        if (this._radius < 0) this.destroy();
        this.x = this._radius * Math.cos(this._angle) + this._canvas.width / 2;
        this.y = -this._radius * Math.sin(this._angle) + this._canvas.height / 2;
    }
}