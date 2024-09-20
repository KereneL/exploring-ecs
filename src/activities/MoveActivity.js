import { TransformComp, MobileComp } from "../components/AllComponents.js";

function MoveActivity(entity, targetPosition) {
  let path = [{ x: 500, y: 500 }]

  return {
    tick: (entity, deltaTime) => {
      console.log("MoveActivity Tick")

      // Path complete
      if (!path || path.length === 0) {
        return true;
      }

      // Get the next point in the path
      const nextPoint = path[0];
      const dx = nextPoint.x - TransformComp.x[entity];
      const dy = nextPoint.y - TransformComp.y[entity];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 1) {
        // Remove the point from the path
        path.shift();
      } else {
        const speed = MobileComp.speed[entity];
        const vx = (dx / distance) * speed * deltaTime;
        const vy = (dy / distance) * speed * deltaTime;
        TransformComp.x[entity] += vx;
        TransformComp.y[entity] += vy;
      }

      // Return true if path is empty
      return path.length === 0;
    }
  };
}

export { MoveActivity }