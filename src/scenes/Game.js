import { Scene } from 'phaser';
import { ECSWorld } from "../ecs/ECSWorld.js";
import { ActivityComp, TransformComp, SpriteComp, MobileComp, MoveTargetComp } from "../components/AllComponents.js"; // Import ECS components
import { issueMoveOrder, issueTurnOrder } from "../orders/AllOrders.js";
import { queueActivity } from "../activities/ActivityManager.js";

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
        this.cursor = this.ecsWorld.createEntity()
        this.player = this.ecsWorld.createEntity()
        this.enemy = this.ecsWorld.createEntity()

        this.ecsWorld.attachComponent(this.cursor, TransformComp)


        // Init Player
        this.ecsWorld.attachComponent(this.player, TransformComp)
        this.ecsWorld.attachComponent(this.player, SpriteComp)
        this.ecsWorld.attachComponent(this.player, MobileComp)
        this.ecsWorld.attachComponent(this.player, MoveTargetComp);
        this.ecsWorld.attachComponent(this.player, ActivityComp);
        TransformComp.x[this.player] = 100;
        TransformComp.y[this.player] = 100;
        TransformComp.rotation[this.player] = Math.PI / 2;
        let createdSprite = this.add.sprite(0, 0, 'img-characterBlue-3')
        let spriteId = this.sprites.push(createdSprite) - 1;
        SpriteComp.texture[this.player] = spriteId;
        MobileComp.speed[this.player] = 0.25;
        MobileComp.turnSpeed[this.player] = 0.025;
        MoveTargetComp.x[this.player] = TransformComp.x[this.player]
        MoveTargetComp.y[this.player] = TransformComp.y[this.player]
        // Init Enemy
        // this.ecsWorld.attachComponent(this.enemy, TransformComp)
        // this.ecsWorld.attachComponent(this.enemy, SpriteComp)
        // this.ecsWorld.attachComponent(this.enemy, MobileComp)
        // //this.ecsWorld.attachComponent(this.enemy, ActivityComp); 
        // TransformComp.x[this.enemy] = 700;
        // TransformComp.y[this.enemy] = 700;
        // createdSprite = this.add.sprite(0, 0, 'img-characterRed-3')
        // spriteId = this.sprites.push(createdSprite) - 1;
        // SpriteComp.texture[this.enemy] = spriteId;
        // MobileComp.speed[this.enemy] = 0.25;


        this.input.on('pointerup', (pointer) => {
            const target = {
                x: Math.round(this.input.mousePointer.x),
                y: Math.round(this.input.mousePointer.y)
            };

            if (pointer.leftButtonReleased()) {
                console.log("Turn order issued to:", target);  // Debugging output
                issueTurnOrder(this.ecsWorld.world, this.player, target);
            } else if (pointer.rightButtonReleased()) {
                console.log("Move order issued to:", target);  // Debugging output
                issueMoveOrder(this.ecsWorld.world, this.player, target);
            }
        });


    }

    update(time, deltaTime) {
        TransformComp.x[this.cursor] = this.input.mousePointer.x
        TransformComp.y[this.cursor] = this.input.mousePointer.y;

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