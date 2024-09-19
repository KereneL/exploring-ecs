export class Activity {
    constructor() {
      this.state = 'queued'; // 'queued', 'active', 'done'
      this.isInterruptible = true;
      this.isDone = false;
    }
  
    OnFirstRun(entity) {
      this.state = 'active';
    }
  
    Tick(entity) {
      if (this.isDone) {
        this.state = 'done';
        this.OnLastRun(entity);
      }
    }
  
    OnLastRun(entity) {}
  
    Cancel(entity) {
      if (this.isInterruptible) {
        this.state = 'done';
      }
    }
  
    IsDone() {
      return this.state === 'done';
    }
  }