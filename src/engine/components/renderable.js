import * as pixi from 'engine/pixi';

export const render_sprite = (entity_id, component_state, messages) => {
    return component_state;
}

export const render_text = (entity_id, component_state, messages) => {
    return component_state;
}

export const mk_sprite_state = (stage, loader, image_path, frame = [0, 0, 0, 0], z_index = 0) => {
    return {
        sprite: pixi.mk_sprite_from_cache(stage, loader, image_path, frame, z_index)
    };
}
