import { defineQuery } from 'bitecs';
import { ActivityCompState } from "../components/ActivityComp.js";
import { ActivityComp } from "../components/AllComponents.js";
import { getActivityById } from "../ecs/ActivityManager.js";

// Define a query for entities with the Activity component
const activityQuery = defineQuery([ActivityComp]);

function ActivitySystem(world, deltaTime) {
  const entities = activityQuery(world);

  entities.forEach(entity => {
    const currentActivity = ActivityComp.current[entity];
    const currentState = ActivityComp.state[entity];

    // If the entity is Idle and there's a queued activity, start the queued one
    if (currentState === ActivityCompState.Idle && ActivityComp.next[entity] !== 0) {
      const nextActivity = ActivityComp.next[entity];
      ActivityComp.current[entity] = nextActivity;
      ActivityComp.state[entity] = ActivityCompState.Active;
      //ActivityComp.next[entity] = 0; // Clear the queue
      return;
    }

    // Get the current activity's function by its ID and run its tick
    const activity = getActivityById.call(entity, currentActivity)

    if (activity && activity.tick(entity, deltaTime)) {
      ActivityComp.state[entity] = ActivityCompState.Done;
    }

    // If the current activity is done, move to the next activity if there is one
    if (ActivityComp.state[entity] === ActivityCompState.Done) {
      const nextActivity = ActivityComp.next[entity];
      if (nextActivity !== 0) {
        ActivityComp.current[entity] = nextActivity;
        ActivityComp.state[entity] = ActivityCompState.Active;
        ActivityComp.next[entity] = 0; // Clear the queue
      } else {
        // No next activity, so set to Idle
        ActivityComp.current[entity] = 0;
        ActivityComp.state[entity] = ActivityCompState.Idle;
      }
    }
  });

  return world;
}

export { ActivitySystem }