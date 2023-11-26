import { GameObjects, Scene } from "phaser";
import { MainScene } from "../scenes/MainScene";
 
export abstract class Bullet extends GameObjects.Sprite
{
    protected _radius;
    protected _angle;
    protected _canvas;

    constructor(scene : MainScene)
    {
        super(scene, scene._player.x, scene._player.y, 'bullet');
        this._canvas = scene.sys.game.canvas;
        this._radius = scene._player.rad;
        this._angle = scene._player.ang;
        this.rotation = scene._player.rotation - Math.PI / 2;
        scene._projectiles.push(this);
        scene.add.existing(this);
    }

    abstract Move() : void
}