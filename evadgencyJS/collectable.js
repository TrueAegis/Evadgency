import { GameObject } from "./gameObject.js";

export let collectables = [];

export function initCollectables() {
    var laneSpawn1 = [192, 320, 448];
    for (var i = 0; i < laneSpawn1.length; i++) {
      let collectable = new GameObject(0, 0, 64, 64, Math.round(Math.random() * 576), laneSpawn1[i], null, 32, 32);
      collectables.push(collectable);
    }
}