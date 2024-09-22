import { AttackTargetComp } from '../components/AllComponents.js';

function AttackActivity(entity) {
  const targetEntity = AttackTargetComp.target[entity];  // Fetch target from the entity's components

  return {
    tick: (entity, deltaTime) => {
      if (targetEntity && targetEntity.health > 0) {
        // Perform attack logic
        console.log(`Entity ${entity} attacks target ${targetEntity}`);
        return false;  // Still attacking
      }

      return true;  // Attack finished
    }
  };
}

export { AttackActivity };