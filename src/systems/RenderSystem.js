import { defineQuery, enterQuery, exitQuery } from 'bitecs';
import { Sprite } from '../components/AllComponents.js'

const hasSpriteQuery = defineQuery([Sprite]);
const hasSpriteQueryEnter = enterQuery(hasSpriteQuery)
const hasSpriteQueryExit = exitQuery(hasSpriteQuery)

function RenderSystem(world, deltaTime) {

  const entitiesEnter = hasSpriteQueryEnter(world);
  const entitiesExist = hasSpriteQuery(world);
  const entitiesExit = hasSpriteQueryExit(world);

  entitiesEnter.forEach(entity => {    enterQuerySprite(entity)  });
  entitiesExist.forEach(entity => {    existingQuerySprite(entity)  });
  entitiesExit.forEach(entity => {    exitQuerySprite(entity)  });

  function enterQuerySprite(eid) {
    return;
  }
  function existingQuerySprite(eid) {
    return;
  }
  function exitQuerySprite(eid) {
    return;
  }
}

export {RenderSystem}
