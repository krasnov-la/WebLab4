import { Scene } from "phaser";

export class MainScene extends Scene {
    constructor () {
      super({ key: 'MainScene' })
    }
    
    text?: Phaser.GameObjects.Text;
    platform?: Phaser.Types.Physics.Arcade.ImageWithStaticBody;

    preload() {
        this.load.image('star', 'favicon.ico');
    }

    create() {
        this.text = this.add.text(100, 100, "MainScene", {
            font: "24px Courier",
            color: "#ffffff",
        });
        this.platform = this.physics.add.staticImage(0, 200, 'star').setOrigin(0, 0).refreshBody();
    }

    update() {
        function incHex(hexStr : string) : string {
            const decNum : integer = parseInt(hexStr.slice(1), 16) + 1;
            return "#"+("000000"+decNum.toString(16)).slice(-6);
        }
        this.text?.style.setColor(incHex(this.text?.style.color as string));
    }
  }