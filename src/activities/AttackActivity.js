import { TransformComp, MobileComp, AttackComp } from "../components/AllComponents.js";

function AttackActivity (entity, targetEntity) {
  return {
    tick: (entity, deltaTime) => {
      console.log("AttackActivity Tick")

      const targetX = TransformComp.x[targetEntity];
      const targetY = TransformComp.y[targetEntity];
      const dx = targetX - TransformComp.x[entity];
      const dy = targetY - TransformComp.y[entity];
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if in range
      const range = AttackComp.range[entity];
      if (distance > range) {
        return false; // Move closer or wait
      }

      // Check if facing the target
      const angleToTarget = Math.atan2(dy, dx);
      if (Math.abs(MobileComp.facing[entity] - angleToTarget) > 0.1) {
        MobileComp.facing[entity] = angleToTarget; // Turn to face target
        return false;
      }

      // Use weapon
      //AttackComp.fire(entity, targetEntity);

      return Attack.ammo[entity] <= 0; // Done if out of ammo
    }
  };
}

export { AttackActivity }