import { MobileComp, MoveTargetComp, TransformComp } from "../components/AllComponents";

function TurnActivity(entity) {
  return {
    tick: (entity, deltaTime) => {
      const targetX = MoveTargetComp.x[entity];
      const targetY = MoveTargetComp.y[entity];

      // Calculate the direction to the target
      const dx = targetX - TransformComp.x[entity];
      const dy = targetY - TransformComp.y[entity];
      const targetRotation = Math.atan2(dy, dx);  // Target angle

      // Get the current rotation of the entity
      const currentRotation = TransformComp.rotation[entity];
      const rotationSpeed = MobileComp.turnSpeed[entity] * deltaTime;

      // Normalize the angle difference
      let rotationDiff = (targetRotation - currentRotation) % (2 * Math.PI);
      if (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
      if (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;

      // Set a small tolerance for when to stop turning
      const tolerance = 0.01;

      // If within tolerance, stop turning and snap to target rotation
      if (Math.abs(rotationDiff) <= tolerance) {
        TransformComp.rotation[entity] = targetRotation;
        console.log(`Entity ${entity} finished turning.`);
        return true;  // Turning complete
      }

      // Continue turning towards the target
      if (rotationDiff > 0) {
        TransformComp.rotation[entity] += Math.min(rotationDiff, rotationSpeed);
      } else if (rotationDiff < 0) {
        TransformComp.rotation[entity] -= Math.min(Math.abs(rotationDiff), rotationSpeed);
      }

      return false;  // Still turning
    }
  };
}

export { TurnActivity };
