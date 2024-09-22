import { MoveTargetComp } from '../components/AllComponents.js';
import { queueActivity } from '../activities/ActivityManager.js';

function issueTurnOrder(world, entity, targetPosition) {
  MoveTargetComp.x[entity] = targetPosition.x;
  MoveTargetComp.y[entity] = targetPosition.y;

  queueActivity(entity, 3);  // Turn first
}

export { issueTurnOrder };