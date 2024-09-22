import { MobileComp, MoveTargetComp, TransformComp} from "../components/AllComponents";

function MoveActivity(entity) {
  return {
    tick: (entity, deltaTime) => {
      const targetX = MoveTargetComp.x[entity];
      const targetY = MoveTargetComp.y[entity];
      const speed = MobileComp.speed[entity];

      const dx = targetX - TransformComp.x[entity];
      const dy = targetY - TransformComp.y[entity];
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if the movement is done
      if (distance < speed * deltaTime) {
        TransformComp.x[entity] = targetX;
        TransformComp.y[entity] = targetY;
        return true;  // Movement complete
      }

      // Calculate velocity and update position
      TransformComp.x[entity] += (dx / distance) * speed * deltaTime;
      TransformComp.y[entity] += (dy / distance) * speed * deltaTime;

      return false;  // Still moving
    }
  };
}

export {MoveActivity}