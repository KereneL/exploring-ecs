import { defineComponent, Types } from 'bitecs';

const TransformComp = defineComponent({
  x: Types.f32,
  y: Types.f32,
  rotation: Types.f32
});

export { TransformComp }