import { defineQuery, enterQuery, exitQuery } from 'bitecs';
import { SpriteComp, TransformComp } from "../components/AllComponents.js";

const hasSpriteQuery = defineQuery([SpriteComp, TransformComp]);
const hasSpriteQueryEnter = enterQuery(hasSpriteQuery);
const hasSpriteQueryExit = exitQuery(hasSpriteQuery);

function RenderSystem(world, deltaTime, sprites) {
  const entitiesEnter = hasSpriteQueryEnter(world);
  const entities = hasSpriteQuery(world);
  const entitiesExit = hasSpriteQueryExit(world);

  // Handle entities that just entered the query
  //entitiesEnter.forEach(entity => {  });

  // Update existing sprites' positions
  entities.forEach(entity => {
    const sprite = sprites[SpriteComp.texture[entity]];
    if (sprite) {
      sprite.x = TransformComp.x[entity];
      sprite.y = TransformComp.y[entity];
      sprite.rotation = TransformComp.rotation[entity];
    }
  });

  // Handle entities that exited the query
  //entitiesExit.forEach(entity => {  });
}

export { RenderSystem };