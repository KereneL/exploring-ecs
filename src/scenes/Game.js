import { Scene } from 'phaser';
import { ECSWorld } from "../ecs/ECSWorld.js";
import { ActivityComp, TransformComp, SpriteComp, MobileComp } from "../components/AllComponents.js"; // Import ECS components
import { queueActivity } from "../ecs/ActivityManager.js";

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x003300);
        const map = this.buildMap()

        this.sprites = [];

        // Initialize your custom World instance
        this.ecsWorld = new ECSWorld(this)
        this.player = this.ecsWorld.createEntity()

        this.ecsWorld.attachComponent(this.player, TransformComp)
        TransformComp.x[this.player] = 100;
        TransformComp.y[this.player] = 100;
        TransformComp.rotation[this.player] = Math.PI / 2;

        this.ecsWorld.attachComponent(this.player, SpriteComp)
        const createdSprite = this.add.sprite(0, 0, 'img-characterRed-3')
        const spriteId = this.sprites.push(createdSprite) - 1;
        SpriteComp.texture[this.player] = spriteId;

        this.ecsWorld.attachComponent(this.player, MobileComp)
        MobileComp.speed[this.player] = 0.25;

        this.ecsWorld.attachComponent(this.player, ActivityComp); // Attach the ActivityComp


        queueActivity(this.ecsWorld, this.player, 1);
    }

    update(time, deltaTime) {
        this.ecsWorld.update(deltaTime)
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


// For your game using bitECS and Phaser, you could follow this pattern by:

//     Creating Order systems that issue high - level commands(like moving).
//     Translating those orders into Activities that represent specific actions(like moving from one point to another).
//     Each entity would have an activity queue, where it stores activities.
//     Implement a tick system that processes the current activity and checks if the next queued activity should begin, based on whether the current one is finished or interruptible.

// This approach allows you to handle complex sequences of actions and manage priorities between orders efficiently.