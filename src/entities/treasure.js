import { pixi } from 'engine_utils';
import { position, renderable, moveable } from 'engine_components';

export const create = (uid, loader, resource, stage) => {
    return {
        uid: uid,
        components: [
            {
                uid: 'sprite',
                state: renderable.mk_sprite_state(loader, stage, resource.name)
            },
            {
                uid: 'position',
                state: position.mk_position_state(0, 0, 0, 0, 0)
            },
            {
                uid: 'controller',
                state: {}
            }
        ]
    };
};
