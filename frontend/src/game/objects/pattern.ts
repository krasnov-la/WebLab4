import { MainScene } from "../scenes/MainScene";
import { BossProjectile } from "./bossProjectile";

export abstract class Pattern
{
    public abstract Spawn(scene : MainScene) : void
}