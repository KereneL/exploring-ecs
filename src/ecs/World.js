import { createWorld } from 'bitecs';

export class World {
    constructor() {
        this.world = createWorld(); // Initialize ECS world
        this.entities = [];
        
    }

    getWorld() {
        return this.world;
    }
}