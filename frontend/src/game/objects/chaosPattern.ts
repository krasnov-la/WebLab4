import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";

export class ChaosPattern extends Pattern
{
    private _speed : integer = 500;

    public get Speed() : integer {
        return this._speed;
    }

    public set Speed(val : integer) {
        this._speed = Math.max(0, val);
    }

    private _delay : integer = 1700;

    public get Delay() : integer {
        return this._delay;
    }

    public set Delay(val : integer) {
        this._delay = Math.max(0, val);
    }

    public Spawn(scene : MainScene): Promise<string> {
        return new Promise((resolve) => {
            let i : integer = 0;
            const bulletCount : integer = 5;
            const waveCount : integer = 3;

            const setIntId : any = setInterval(() => {
                if(i >= waveCount) clearInterval(setIntId);
                for(let j : integer = 0; j < bulletCount; j++)
                    new BossBullet(scene, 2 * Math.PI * Math.random(), 100);
                i++;
            }, this._speed);

            setTimeout(() => {
                resolve("ring pattern end");
            }, this._delay);
        });
    }
}