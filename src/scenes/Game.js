import { Scene } from 'phaser';
import { addEntity, createWorld, pipe, addComponent } from 'bitecs'
import { Transform, Sprite, Mobile } from '../components/AllComponents.js'; // Import ECS components
import { MovementSystem, RenderSystem } from '../systems/AllSystems.js'; // Import ECS systems

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x003300);
        const map = this.buildMap()

        this.sprites = ["","","",""];

        // Initialize your custom World instance
        this.ecsWorld = createWorld();
        this.player = addEntity(this.ecsWorld);
        
        // Optionally, initialize the components' values, e.g.:
        addComponent(this.ecsWorld, Transform, this.player);
        Transform.x[this.player] = 100;
        Transform.y[this.player] = 200;
        
        addComponent(this.ecsWorld, Sprite, this.player);
        const createdSprite = this.add.sprite(Transform.x[this.player], Transform.y[this.player], 'img-characterRed-3')
        const spriteId =  this.sprites.push(createdSprite) -1;
        console.log(spriteId)
        Sprite.texture[this.player] = spriteId;
        
        addComponent(this.ecsWorld, Mobile, this.player);
        Mobile.velocityX[this.player] = 1;
        Mobile.velocityY[this.player] = 0;
        Mobile.speed[this.player] = 0;

        this.ecsSystems = [
            MovementSystem,
            RenderSystem
        ]
    }

    update(time, deltaTime) {
        for (let system of this.ecsSystems) {
            system(this.ecsWorld, deltaTime);
        }
    }

    buildMap() {
        const map = this.make.tilemap({ key: 'tiled-map', tileWidth: 64, tileHeight: 64 })

        // add the tileset image we are using
        const tilesetImages = [
            map.addTilesetImage('elements', 'img-elements'),
            map.addTilesetImage('groundTarmac', 'img-groundTarmac'),
        ]

        // create the layers we want in the right order
        map.createLayer('Floor', tilesetImages, 0, 0)
        map.createLayer('Elements', tilesetImages, 0, 0)

        return map
    }

}
