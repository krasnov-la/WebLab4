import { Game, AUTO, Scale } from "phaser";
import { MainScene } from "./scenes/MainScene";
import { PreloadScene } from "./scenes/PreloadScene";
import * as Bluebird from "bluebird";


export function launch() {
  Bluebird.Promise.config({
    cancellation: true
  });

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
    transparent: true,
    scene: [
      PreloadScene,
      MainScene
    ]
  });
}
