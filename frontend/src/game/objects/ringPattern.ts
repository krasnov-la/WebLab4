import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";

export class RingPattern extends Pattern
{
    private _speed : integer = 10;

    public get Speed() : integer {
        return this._speed;
    }

    public set Speed(val : integer) {
        this._speed = Math.max(0, val);
    }

    private _delay : integer = 1000;

    public get Delay() : integer {
        return this._delay;
    }

    public set Delay(val : integer) {
        this._delay = Math.max(0, val);
    }

    public Spawn(scene : MainScene): Promise<string> {
        return new Promise((resolve) => {
            const ticksAtStart = scene.Ticks;

            for(let i : integer = 0; i < 12; i++) {
                new BossBullet(scene, i * Math.PI / 6, 100);
            }

            setTimeout(() => {
                resolve("ring pattern end");
            }, this._delay);
        })
    }
}