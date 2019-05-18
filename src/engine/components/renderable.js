import { pixi } from 'engine_utils';

const set_position = (sprite, position) => {
    sprite.position.set(position.map_x, position.map_y);
};

export const mk_sprite_state = (loader, stage, img_path) => {
    return {
        sprite: pixi.mk_sprite(loader, stage, img_path)
    };
};

export const sprite_fn = (entity_id, component_state, messages) => {
    const sprite = component_state.sprite;
    const position = messages.components.position;
    set_position(sprite, position);
    return {
        new_component_state: component_state,
        events: []
    };
};

export const render_text = (entity_id, component_state, messages) => {
    return component_state;
};
