import { GameObjects, Scene } from "phaser";
import { Pattern } from "./pattern";
import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { RingPattern } from "./ringPattern";
 
export class Boss extends GameObjects.Sprite
{
    private _patterns : Pattern[] = []
    private _scene : MainScene;

    constructor(scene : MainScene)
    {
        super(scene, scene.sys.game.canvas.width / 2, scene.sys.game.canvas.height / 2, 'boss');
        this._scene = scene;
        scene.physics.world.enableBody(this);
        scene.add.existing(this);
        this.scale = 1.5;
        const body : any = this.body;
        body.setSize(15, 15);
        this.play('boss_anim');
        //Все имеющиеся паттерны пушить в массив
        this._patterns.push(new RingPattern());
    }

    public Attack() : void
    {
        //Рандомизировать выбор атак
        this._patterns[0].Spawn(this._scene);
    }

    public Damage()
    {
        console.log("hit");
    }
}