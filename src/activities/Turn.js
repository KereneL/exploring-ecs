import { Activity } from './Activity.js';

export class TurnActivity extends Activity {
  constructor(targetAngle, turnSpeed) {
    super();
    this.targetAngle = targetAngle;
    this.turnSpeed = turnSpeed;
  }

  Tick(entity) {
    const transform = entity.getComponent('Transform');
    const currentAngle = transform.rotation;
    const deltaAngle = this.targetAngle - currentAngle;

    if (Math.abs(deltaAngle) < this.turnSpeed) {
      transform.rotation = this.targetAngle;
      this.isDone = true;
    } else {
      transform.rotation += Math.sign(deltaAngle) * this.turnSpeed;
    }
  }
}
