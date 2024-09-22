import { MoveTargetComp } from '../components/AllComponents.js';
import { queueActivity } from '../activities/ActivityManager.js';

function issueMoveOrder(world, entity, targetPosition) {
  MoveTargetComp.x[entity] = targetPosition.x;
  MoveTargetComp.y[entity] = targetPosition.y;

  queueActivity(entity, 3, false);  // Turn first
  queueActivity(entity, 1);  // Then move
}

export { issueMoveOrder };