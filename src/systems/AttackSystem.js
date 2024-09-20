import { defineQuery } from 'bitecs';
import { AttackComp, TransformComp, HealthComp } from "../components/AllComponents.js";

const attackQuery = defineQuery([AttackComp, TransformComp]);

function AttackSystem(world, deltaTime) {
  const entities = attackQuery(world);

  entities.forEach(entity => {
    const target = AttackComp.target[entity];
    const targetHealth = HealthComp.health[target];
    const targetPosition = TransformComp.x[target]; // Assuming Transform holds position for both attacker and target

    if (!targetHealth || !targetPosition) return;

    // Check range
    const dx = TransformComp.x[entity] - TransformComp.x[target];
    const dy = TransformComp.y[entity] - TransformComp.y[target];
    const distanceSquared = dx * dx + dy * dy;
    const rangeSquared = AttackComp.range[entity] * AttackComp.range[entity];

    if (distanceSquared <= rangeSquared) {
      const currentTime = world.time; // Assuming your world stores current time in ticks or seconds

      // Check cooldown
      if (currentTime - AttackComp.lastAttackTime[entity] >= AttackComp.cooldown[entity]) {
        // Apply damage
        HealthComp.health[target] -= AttackComp.damage[entity];

        // Record time of the last attack
        AttackComp.lastAttackTime[entity] = currentTime;

        console.log(`Entity ${entity} attacked Entity ${target} for ${AttackComp.damage[entity]} damage`);
      }
    }
  });
}

export { AttackSystem }