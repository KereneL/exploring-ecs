import { defineComponent, Types } from 'bitecs';

const AttackComp = defineComponent({
  damage: Types.ui16,         // Damage dealt per attack
  range: Types.f32,           // Attack range
  cooldown: Types.f32,        // Cooldown time between attacks
  target: Types.eid,          // Entity ID of the attack target
  lastAttackTime: Types.f32,  // Time of the last attack
});

export { AttackComp }