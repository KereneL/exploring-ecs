import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const scale = 1
const config = {
    type: Phaser.AUTO,
    width: 1024*scale,
    height: 768*scale,
    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,
    title: "Exploring ECS",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

export default new Phaser.Game(config);
