import { position, renderable } from 'engine_components';

export const create = (stage, loader, uid, pos_x, pos_y, pos_z, map_x, map_y) => {
    return {
        uid: uid,
        systems: [
            {
                uid: 'keyboard_input'
            },
        ],
        components: [
            {
                uid: 'sprite',
                state: renderable.mk_sprite_state(stage, loader, '/img/icon.png')
            },
            {
                uid: 'position',
                state: position.mk_position_state(pos_x, pos_y, pos_z, map_x, map_y)
            },
        ]
    }
};
