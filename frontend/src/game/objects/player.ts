import { GameObjects, Scene } from "phaser";
 
export class Player extends GameObjects.Sprite
{
    private _radius;
    private _angle;
    private _canvas;

    public get rad()
    {
        return this._radius;
    }

    public set rad(newRad : number)
    {
        if (newRad >= 100 && newRad <= 200) this._radius = newRad;
    }

    public get ang()
    {
        return this._angle;
    }

    public set ang(newAng : number)
    {
        this._angle = newAng;;
    }

    constructor(scene: Scene, radius : number, angle : number) 
    {
        super(scene, 0, 0, 'ship');
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        this.scale = 0.05;
        const body : any = this.body;
        body.setSize(300, 300);
        this._canvas = scene.sys.game.canvas;
        this._radius = radius;
        this._angle = angle;
        this.flipX = true;
        this.reposition();
    }

    private reposition()
    {
        this.x = this._radius * Math.cos(this._angle) + this._canvas.width / 2;
        this.y = -this._radius * Math.sin(this._angle) + this._canvas.height / 2;
        this.rotation = -this._angle;
    }

    public move(dRadius : number, dAngle : number) {
        this.rad += dRadius;
        this.ang += dAngle;
        this.reposition();
    }

    public damage() : void
    {
        this.destroy();
    }
}