import { ActivityComp, ActivityCompState } from "../components/ActivityComp.js";
import { AttackActivity, MoveActivity, IdleActivity } from "../activities/AllActivities.js";

/**
 * Queues an Activity for the entity.
 * If the current ActivityComp is interruptible, it will be replaced immediately.
 * Otherwise, the new ActivityComp will be queued and executed after the current one finishes.
 */
function queueActivity(world, entity, newActivityId, interruptible = true) {
  const currentActivity = ActivityComp.current[entity];
  const currentState = ActivityComp.state[entity];

  // If the current activity is idle or interruptible, start the new one immediately
  if (currentActivity === 0 || currentState === ActivityCompState.Idle || interruptible) {
    ActivityComp.current[entity] = newActivityId;
    ActivityComp.state[entity] = ActivityCompState.Active;
  } else {
    // Otherwise, queue it as the next activity
    ActivityComp.next[entity] = newActivityId;
  }
}

/**
 * Function to get the ActivityComp implementation by its ID
 * Use .call(entityId, activiyId, args...)
 */
function getActivityById(activityId, args = []) {
  switch (activityId) {
    case 1:
      return MoveActivity(this, ...args);
    case 2:
      return AttackActivity(this, ...args);
    default:
      return IdleActivity(this, ...args);
  }
}

export { queueActivity, getActivityById }