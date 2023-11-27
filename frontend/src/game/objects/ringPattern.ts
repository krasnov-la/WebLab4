import { BossProjectile } from "./bossProjectile";
import { MainScene } from "../scenes/MainScene";
import { Pattern } from "./pattern";
import { BossBullet } from "./bossBullet";

export class RingPattern extends Pattern
{
    public Spawn(scene : MainScene): void {
        
        new BossBullet(scene, 0, 100),
        new BossBullet(scene, 1 * Math.PI / 6, 100),
        new BossBullet(scene, 2 * Math.PI / 6, 100),
        new BossBullet(scene, 3 * Math.PI / 6, 100),
        new BossBullet(scene, 4 * Math.PI / 6, 100),
        new BossBullet(scene, 5 * Math.PI / 6, 100),
        new BossBullet(scene, 6 * Math.PI / 6, 100),
        new BossBullet(scene, 7 * Math.PI / 6, 100),
        new BossBullet(scene, 8 * Math.PI / 6, 100),
        new BossBullet(scene, 9 * Math.PI / 6, 100),
        new BossBullet(scene, 10 * Math.PI / 6, 100),
        new BossBullet(scene, 11 * Math.PI / 6, 100)
    }
}