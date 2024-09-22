import { defineComponent, Types } from 'bitecs';

const AttackTargetComp = defineComponent({
    targetEntity: Types.eid // Stores the entity ID of the target
});

export { AttackTargetComp }