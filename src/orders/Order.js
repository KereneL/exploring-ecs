class Order {
    constructor(type, ...args) {
        this.type = type;
        this.args = args; // Flexible arguments based on the order type
    }

    // Executes the order for a given entity, translating it into an activity
    execute(world, entity) {
        switch (this.type) {
            case "Move":
                if (this.targetPosition) {
                    queueActivity(entity, 1, true);  // Assuming MoveActivity has ID 1
                }
                break;

            case "Attack":
                if (this.targetEntity) {
                    queueActivity(entity, 2, true);  // Assuming AttackActivity has ID 2
                }
                break;

            default:
                console.error(`Unknown order type: ${this.type}`);
                break;
        }
    }
}

export { Order }