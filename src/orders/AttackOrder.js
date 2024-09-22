import { AttackTargetComp } from '../components/AllComponents.js';
import { queueActivity } from '../activities/ActivityManager.js';

function issueAttackOrder(world, entity, targetEntity) {
  AttackTargetComp.target[entity] = targetEntity;

  queueActivity(entity, 2);  // AttackActivity has ID 2
}

export { issueAttackOrder };