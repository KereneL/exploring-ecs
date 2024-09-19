export function ActivitySystem(entities, deltaTime) {
    entities.forEach(entity => {
      const activityQueue = entity.getComponent('ActivityQueue');
      
      if (activityQueue) {
        let currentActivity = activityQueue.currentActivity;
  
        if (!currentActivity || currentActivity.IsDone()) {
          currentActivity = activityQueue.queue.shift(); // Get the next activity
          if (currentActivity) {
            currentActivity.OnFirstRun(entity);
            activityQueue.currentActivity = currentActivity;
          }
        }
  
        if (currentActivity) {
          currentActivity.Tick(entity, deltaTime);
        }
      }
    });
  }