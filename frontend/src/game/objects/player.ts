import { GameObjects, Scene } from "phaser";
 
export class Player extends GameObjects.Sprite
{
    private _radius;
    private _angle;
    private _canvas;
    private _playerBaseDamage = 20;

    private _minRad = 100;
    private _maxRad = 200;

    public get rad()
    {
        return this._radius;
    }

    public set rad(newRad : number)
    {
        if (newRad >= this._minRad && newRad <= this._maxRad) this._radius = newRad;
    }

    public get ang()
    {
        return this._angle;
    }

    public set ang(newAng : number)
    {
        this._angle = newAng;
    }

    public get PlayerBaseDamage() : number {
        return this._playerBaseDamage;
    }

    public set PlayerBaseDamage(val : number) {
        this._playerBaseDamage = val;
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

    public GetDamage() : integer {
        return Math.ceil(this._damageMult() * this._playerBaseDamage);
    }

    private _damageMult() : number {
        const radDiff = this._maxRad - this._minRad;
        const curRadDiff = this._radius - this._minRad;
        const pureCoeff = 1 - curRadDiff / radDiff;
        const finalCoeff = (0.8) * pureCoeff + 0.2;
        return finalCoeff;
    }
}