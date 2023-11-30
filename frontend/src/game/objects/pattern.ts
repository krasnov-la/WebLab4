import { MainScene } from "../scenes/MainScene";
import { BossProjectile } from "./bossProjectile";

export abstract class Pattern
{
    public abstract get Speed() : integer;
    public abstract set Speed(val : integer);

    public abstract get Delay() : integer;
    public abstract set Delay(val : integer);

    public abstract Spawn(scene : MainScene) : Promise<string>
}