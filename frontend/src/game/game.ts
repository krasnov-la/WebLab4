import { Game, AUTO, Scale } from "phaser";
import { MainScene } from "./scenes/MainScene";

export function launch() {
  return new Game({
    type: AUTO,
    scale: {
      width: "80%",
      autoCenter: Scale.CENTER_BOTH,
      height: "80%",
    },
    physics: {
      default: "arcade",
    },
    parent: "game",
    backgroundColor: "#201726",
    scene: MainScene,
  });
}