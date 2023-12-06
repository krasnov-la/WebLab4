import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";
import Bluebird from "bluebird";

export class ChaosPattern extends Pattern
{
    private _speed : integer = 500;

    public get Speed() : integer {
        return this._speed;
    }

    public set Speed(val : integer) {
        this._speed = Math.max(0, val);
    }

    private _delay : integer = 2000;

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
            const bulletCount : integer = 5;
            const waveCount : integer = 3;
            const _patternSound = scene.sound.add("chaosPatternSound");

            const setIntId : any = setInterval(() => {
                if(i >= waveCount) clearInterval(setIntId);
                _patternSound.volume = 0.2;
                _patternSound.play();
                for(let j : integer = 0; j < bulletCount; j++)
                    new BossBullet(scene, 2 * Math.PI * Math.random(), 100);
                i++;
            }, this._speed);

            setTimeout(() => {
                resolve("ring pattern end");
            }, this._delay);
        });
    }

    public Stop(scene : MainScene): void {
        if(this._promise != null) {
            this._promise.cancel();
        }
    }
}