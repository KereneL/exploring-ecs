import { defineQuery } from 'bitecs';
import { TransformComp, MobileComp } from "../components/AllComponents.js";

// Define a query for entities that have both Transform and Mobile components
const mobileQuery = defineQuery([TransformComp, MobileComp]);

function MovementSystem(world, deltaTime) {

  const entities = mobileQuery(world);

  entities.forEach(entity => {
    // Update position based on velocity and deltaTime
    TransformComp.x[entity] += MobileComp.velocityX[entity] * deltaTime;
    TransformComp.y[entity] += MobileComp.velocityY[entity] * deltaTime;
    //Transform.rotation[entity] = /TODO/

  });

  return world
}

export { MovementSystem };