import { Game, AUTO, Scale } from "phaser";
import { MainScene } from "./scenes/MainScene";
import { PreloadScene } from "./scenes/PreloadScene";

export function launch() {
  return new Game({
    type: AUTO,
    scale: {
      width: '80%',
      autoCenter: Scale.CENTER_BOTH,
      height: '80%',
    },
    input: {
      keyboard: true
    },
    physics: {
      default: 'arcade'
    },
    parent: 'game',
    backgroundColor: '#201726',
    scene: [
      PreloadScene,
      MainScene
    ]
  });
}