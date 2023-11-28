import { Game, AUTO, Scale } from "phaser";
import { MainScene } from "./scenes/MainScene";
import { PreloadScene } from "./scenes/PreloadScene";

export function launch() {
  return new Game({
    type: AUTO,
    scale: {
      width: '100%',
      autoCenter: Scale.CENTER_BOTH,
      height: '100%',
    },
    input: {
      keyboard: true
    },
    physics: {
      default: 'arcade'
    },
    parent: 'game',
    transparent: true,
    scene: [
      PreloadScene,
      MainScene
    ]
  });
}
