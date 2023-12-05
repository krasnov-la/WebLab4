import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";
import Bluebird from "bluebird";

export class SpiralPattern extends Pattern
{
    private _speed : integer = 100;

    public get Speed() : integer {
        return this._speed;
    }

    public set Speed(val : integer) {
        this._speed = Math.max(0, val);
    }

    private _delay : integer = 2500;

    public get Delay() : integer {
        return this._delay;
    }

    public set Delay(val : integer) {
        this._delay = Math.max(0, val);
    }

    private _promise? : Bluebird<string>;

    public Spawn(scene : MainScene): Bluebird<string> {
        return this._promise = new Bluebird<string>((resolve) => {
            let i : integer = 0;
            const bulletCount = 20;
            const randAngle : number = 2 * Math.PI * Math.random();
            const _patternSound = scene.sound.add("spiralPatternSound");

            const setIntId : any = setInterval(() => {
                if(i >= bulletCount) clearInterval(setIntId);
                _patternSound.volume = 0.07;
                _patternSound.play();
                new BossBullet(scene, (i++ * 2 * Math.PI / bulletCount) + randAngle, 100);
            }, this._speed);

            setTimeout(() => {
                resolve("ring pattern end");
            }, this._delay);
        });
    }

    public Stop(scene : MainScene) : void {
        if(this._promise != null) {
            this._promise.cancel();
        }
    }
}