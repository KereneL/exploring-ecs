import { ActivityComp, ActivityCompState } from "../components/ActivityComp.js";
import { AttackActivity, MoveActivity, TurnActivity, IdleActivity } from "./AllActivities.js";

function queueActivity(entity, newActivityId, interruptible = true) {
  const currentActivity = ActivityComp.current[entity];
  const currentState = ActivityComp.state[entity];

  if (currentActivity === 0 || currentState === ActivityCompState.Idle || interruptible) {
    // Start the new activity immediately if there's no current activity or it's interruptible
    ActivityComp.current[entity] = newActivityId;
    ActivityComp.state[entity] = ActivityCompState.Active;
  } else {
    // Otherwise, queue the next activity to prevent overlap
    ActivityComp.next[entity] = newActivityId;
  }
}

function getActivityById(entity, activityId) {
  switch (activityId) {
    case 1:
      return MoveActivity(entity);
    case 2:
      return AttackActivity(entity);
    case 3:
      return TurnActivity(entity);
    default:
      return IdleActivity(entity);
  }
}

export { queueActivity, getActivityById };
