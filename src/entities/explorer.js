import { pixi } from 'engine_utils';
import { position, renderable, moveable } from 'engine_components';

export const create = (uid, loader, resource, renderer, stage) => {
    const x = 68;
    const y = renderer.height / 2 - resource.texture.height / 2;
    return {
        uid: uid,
        components: [
            {
                uid: 'sprite',
                state: renderable.mk_sprite_state(loader, stage, resource.name)
            },
            {
                uid: 'position',
                state: position.mk_position_state(x, y)
            },
            {
                uid: 'controller',
                state: {}
            }
        ]
    };
};
