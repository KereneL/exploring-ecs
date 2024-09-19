import { Activity } from './Activity.js';

export class WaitActivity extends Activity {
  constructor(waitTime) {
    super();
    this.waitTime = waitTime;
    this.elapsedTime = 0;
  }

  Tick(entity, deltaTime) {
    this.elapsedTime += deltaTime;

    if (this.elapsedTime >= this.waitTime) {
      this.isDone = true;
    }
  }
}
