import { pixi } from 'engine_utils';

const set_position = (sprite, position) => {
    sprite.position.x = position.screen_x;
    sprite.position.y = position.screen_y;
};

export const mk_sprite_state = (loader, stage, img_path) => {
    return {
        sprite: pixi.mk_sprite_from_cache(loader, stage, img_path)
    }
};

export const render_sprite = (entity_id, component_state, messages) => {
    const sprite = component_state.sprite;
    const animateable = messages.animateable;
    const position = messages.position;
    set_position(sprite, position);
    return {
        component_state: component_state,
        events: []
    };
}

export const render_text = (entity_id, component_state, messages) => {
    return {
        component_state: component_state,
        events: [],
    };
}
