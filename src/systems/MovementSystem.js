import { defineQuery, enterQuery, exitQuery } from 'bitecs';
import { Transform, Mobile } from '../components/AllComponents.js'

// Define a query for entities that have both Transform and Mobile components
const mobileQuery = defineQuery([Transform, Mobile]);

function MovementSystem(world, deltaTime) {
  const entities = mobileQuery(world);

  entities.forEach(entity => {
    // Update position based on velocity
    Transform.x[entity] += Mobile.velocityX[entity] * deltaTime;
    Transform.y[entity] += Mobile.velocityY[entity] * deltaTime;
  });
}

export { MovementSystem }

