import { Order } from "./Order";

function issuePatrolOrder(world, entity, startPosition, endPosition) {
    const patrolOrder = new Order("Patrol", startPosition, endPosition); // Pass both start and end positions
    patrolOrder.execute(world, entity);
}

export { issuePatrolOrder }