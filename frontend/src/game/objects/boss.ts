import { GameObjects, Scene } from "phaser";
import { Pattern } from "./pattern";
import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { RingPattern } from "./ringPattern";
import { SpiralPattern } from "./spiralPattern";
import { ChaosPattern } from "./chaosPattern";
 
export class Boss extends GameObjects.Sprite
{
    private _patterns : Pattern[] = []
    private _scene : MainScene;

    private _curPattern? : Pattern;

    private _damageCount : integer = 0;
    private _phaseNumber : integer = 1;

    public get DamageCount() : integer {
        return this._damageCount;
    }

    public get PhaseNumber() : integer {
        return this._phaseNumber;
    }

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
        this._patterns.push(new SpiralPattern());
        this._patterns.push(new ChaosPattern());
    }

    /*public Attack() : Promise<string>
    {

        //Рандомизировать выбор атак
        this._patterns[0].Spawn(this._scene);
    }*/

    public GetRandomPattern() : Pattern
    {
        const randNum : number = Math.floor(Math.random() * this._patterns.length);
        return this._patterns[randNum];
    }

    public StartAttack() : void
    {
        if(this._curPattern == null) {
            this.AssignNewPattern();
        }
    }

    public AssignNewPattern() : void 
    {
        this._curPattern = this.GetRandomPattern();
        this._curPattern.Spawn(this._scene).then((msg : string) => {
            this.AssignNewPattern();
        });
    }

    public Damage(damageCount : integer = 5)
    {
        this._damageCount += damageCount;
        this.UpdatePhase();
        console.log("hit");
    }

    private UpdatePhase() : void 
    {
        const _shiftPhaseDamageCount : integer = 150;
        this._phaseNumber = Math.ceil(this._damageCount / _shiftPhaseDamageCount);

        const colorShift = 5;
        const colorShiftReduce = 1 - (1 / 50) * Math.min(this._phaseNumber, 50);
        const k = Math.floor(colorShift * colorShiftReduce * this._phaseNumber);
        const tintColor = 0xffffff - k * 0x101;
        this.setTint(tintColor);

        console.log(k);
        console.log(this.tint);
    }
} 