import { GameObjects, Scene } from "phaser";
 
export class Boss extends GameObjects.Sprite
{
    constructor(scene : Scene)
    {
        super(scene, scene.sys.game.canvas.width / 2, scene.sys.game.canvas.height / 2, 'boss');
        scene.add.existing(this);
    }
}