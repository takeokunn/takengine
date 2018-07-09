import { regl } from 'engine_utils';
import { position, renderable } from 'engine_components';

export const create = uid => {
    const entity_position = position.mk_position_state(-0.9, 0.0, 0.02, 0.15);
    return {
        uid: uid,
        systems: [
            {
                uid: 'keyboard_input'
            },
            {
                uid: 'render'
            },
        ],
        components: [
            {
                uid: 'sprite'
            },
            {
                uid: 'controller'
            },
            {
                uid: 'position',
                state: {
                    aabb: {
                        c: entity_position.x,
                        r: entity_position.y,
                    }
                }
            }
        ]
    }
};
