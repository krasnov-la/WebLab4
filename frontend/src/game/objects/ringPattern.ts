import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";
import Bluebird from 'bluebird';

export class RingPattern extends Pattern
{
    private _speed : integer = 10;

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
            const randAngle : number = 2 * Math.PI * Math.random();

            for(let i : integer = 0; i < 12; i++) {
                new BossBullet(scene, i * Math.PI / 6 + randAngle, 100);
            }

            setTimeout(() => {
                resolve("ring pattern end");
            }, this._delay);
        })
    }

    public Stop() {
        if(this._promise != null) {
            this._promise.cancel();
        }
    }
}