import { List } from 'immutable';

import { component_state } from './component';
import { entity_state } from './entity';
import { renderer_state } from './renderer';
import { scene_state } from './scene';
import { system_state } from './system';
import { tilemap_state } from './tilemap';

export const init_state = (renderer, stage, loader) => {
    return [
        ...component_state,
        ...system_state,
        ...entity_state(stage, loader),
        ...renderer_state(renderer, stage),
        ...scene_state,
        ...tilemap_state(renderer, stage, loader)
    ];
}
