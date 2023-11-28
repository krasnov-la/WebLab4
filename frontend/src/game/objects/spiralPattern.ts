import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";

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

    private _promise? : Promise<string>;

    public Spawn(scene : MainScene): Promise<string> {
        return this._promise = new Promise((resolve) => {
            let i : integer = 0;
            const bulletCount = 20;

            const setIntId : any = setInterval(() => {
                if(i >= bulletCount) clearInterval(setIntId);
                new BossBullet(scene, i++ * 2 * Math.PI / bulletCount, 100);
            }, this._speed);

            setTimeout(() => {
                resolve("ring pattern end");
            }, this._delay);
        });
    }
}