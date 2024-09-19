import { Activity } from './Activity.js';

export class MoveActivity extends Activity {
  constructor(destination, speed) {
    super();
    this.destination = destination;
    this.speed = speed;
  }

  Tick(entity) {
    const transform = entity.getComponent('Transform');
    const dist = Phaser.Math.Distance.Between(transform.x, transform.y, this.destination.x, this.destination.y);

    if (dist <= this.speed) {
      transform.x = this.destination.x;
      transform.y = this.destination.y;
      this.isDone = true;
    } else {
      const angle = Phaser.Math.Angle.Between(transform.x, transform.y, this.destination.x, this.destination.y);
      transform.x += Math.cos(angle) * this.speed;
      transform.y += Math.sin(angle) * this.speed;
    }
  }
}

/src/activities/TurnActivity.js

js

import { Activity } from './Activity.js';
