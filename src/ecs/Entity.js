import { addEntity, addComponent } from 'bitecs';

class Entity {
    constructor(world) {
        this.world = world
        this.eid = addEntity(this.world)
    }

    attachComponent(component) {
        return addComponent(this.world, component, this.eid);
    }
}

export { Entity }