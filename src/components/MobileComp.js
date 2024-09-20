import { defineComponent, Types } from 'bitecs';

const MobileComp = defineComponent({
  velocityX: Types.f32,
  velocityY: Types.f32,
  speed: Types.f32
});

export { MobileComp }