import { addComponent, removeComponent } from 'bitecs';

export class Entity {
    constructor(world) {
        this.world = world.getWorld();
        this.components = {};
        this.id = addEntity(this.world); // Create a new entity in the ECS world
    }
}