import { defineComponent, Types } from 'bitecs';

const ActivityCompState = {
  Queued: 0,
  Active: 1,
  Canceling: 2,
  Done: 3
};

// Activity component tracks current activity and its state
const ActivityComp = defineComponent({
  current: Types.ui8,  // ID of the current activity
  state: Types.ui8,    // State of the current activity
  next: Types.ui8      // ID of the next queued activity (if any)
});

export { ActivityCompState, ActivityComp }