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

    private _delayMult : integer = 0;
    private _speedMult : integer = 0;

    private _shiftPhaseDamageCount : integer = 250;

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
        this._updatePhase();
    }

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

    public StopAttack() : void 
    {
        this._curPattern?.Stop(this._scene);
    }

    public AssignNewPattern() : void 
    {
        this._curPattern = this.GetRandomPattern();
        this._curPattern.Delay /= this._delayMult;
        this._curPattern.Speed /= this._speedMult;
        this._curPattern.Spawn(this._scene).then((msg : string) => {
            this.AssignNewPattern();
        });
    }

    public Damage(damageCount : integer = 5)
    {
        this._damageCount += damageCount;
        this._updatePhase();
    }

    private _updatePhase() : void 
    {
        const eps = 0.00001;
        if(this._damageCount < eps) this._phaseNumber = 1;
        else this._phaseNumber = Math.ceil(this._damageCount / this._shiftPhaseDamageCount);

        this._updateBossSprite();
        this._updateBossStats();
    }

    private _updateBossStats() : void {
        this._delayMult = this._speedMult = (-80) / (this._phaseNumber + 35) + 3;
    }

    private _updateBossSprite() : void {
        const colorShift = (-4000) / (this._phaseNumber + 15) + 250;
        const tintColor = 0xffffff - colorShift * 0x101;
        this.setTint(tintColor);
    }
} 