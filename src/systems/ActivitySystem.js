import { defineQuery } from 'bitecs';
import { ActivityComp, ActivityCompState } from '../components/ActivityComp.js';
import { getActivityById } from '../activities/ActivityManager.js';

// Define a query for entities with the Activity component
const activityQuery = defineQuery([ActivityComp]);

function ActivitySystem(world, deltaTime) {
  const entities = activityQuery(world);

  entities.forEach(entity => {
    const currentActivity = ActivityComp.current[entity];
    const currentState = ActivityComp.state[entity];

    // If the current activity is active, run its tick function
    if (currentState === ActivityCompState.Active) {
      const activity = getActivityById(entity, currentActivity);

      // Execute the activity's tick method
      const isDone = activity.tick(entity, deltaTime);

      // If the activity is done, mark it as Done and check for the next activity
      if (isDone) {
        ActivityComp.state[entity] = ActivityCompState.Done;

        // Check if there is a queued activity to start next
        const nextActivity = ActivityComp.next[entity];
        if (nextActivity) {
          ActivityComp.current[entity] = nextActivity;
          ActivityComp.state[entity] = ActivityCompState.Active;
          ActivityComp.next[entity] = 0;  // Clear the queue
        } else {
          // No more activities, entity goes idle
          ActivityComp.state[entity] = ActivityCompState.Idle;
        }
      }
    }
  });

  return world;
}

export { ActivitySystem };
