import { createWorld, addComponent } from 'bitecs';
import { ActivitySystem, MovementSystem, RenderSystem, AttackSystem } from "../systems/AllSystems.js";
import { Entity } from "./Entity.js";

class ECSWorld {
    constructor(scene) {
        this.scene = scene;  // Reference to the Phaser game scene
        this.world = createWorld(); // ECS world

        this.systems = [
            (world, deltaTime) => ActivitySystem(world, deltaTime),
            (world, deltaTime) => MovementSystem(world, deltaTime),
            (world, deltaTime) => AttackSystem(world, deltaTime),
            (world, deltaTime) => RenderSystem(world, deltaTime, this.scene.sprites),
        ];
    }

    createEntity() {
        const entity = new Entity(this.world);
        return entity.eid;
    }
    attachComponent(eid, component) {
        addComponent(this.world, component, eid)
    }

    update(deltaTime) {
        for (let system of this.systems) {
            system(this.world, deltaTime);
        }
    }
}

export { ECSWorld }