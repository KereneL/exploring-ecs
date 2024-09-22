import { defineQuery } from 'bitecs';
import { TransformComp, MobileComp, ActivityComp } from '../components/AllComponents.js';
import { ActivityCompState } from '../components/ActivityComp.js';
import { getActivityById } from '../activities/ActivityManager.js';

// Define a query for entities that have Transform and Mobile components
const movementQuery = defineQuery([TransformComp, MobileComp, ActivityComp]);

function MovementSystem(world, deltaTime) {
  const entities = movementQuery(world);

  entities.forEach(entity => {
    const currentActivity = ActivityComp.current[entity];
    const activityState = ActivityComp.state[entity];

    // Only process movement if the entity's activity is "Move"
    if (activityState === ActivityCompState.Active && currentActivity !== 0) {
      const activity = getActivityById(entity, currentActivity);

      if (activity && activity.tick(entity, deltaTime)) {
        // If activity finishes, mark it as done
        ActivityComp.state[entity] = ActivityCompState.Done;
      }
    }
  });

  return world;
}

export { MovementSystem };
