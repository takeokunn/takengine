import { pixi } from 'engine_utils';
import { position, renderable, moveable } from 'engine_components';

export const create = (index, uid, loader, resource, stage) => {
    const x = 120 + index * 50;
    return {
        uid: uid,
        components: [
            {
                uid: 'sprite',
                state: renderable.mk_sprite_state(loader, stage, resource.name)
            },
            {
                uid: 'position',
                state: position.mk_position_state(x, 120)
            },
        ]
    };
};
