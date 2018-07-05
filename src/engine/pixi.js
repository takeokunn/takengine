import { Texture, Sprite, Rectangle } from 'pixi.js';

const set_sprite_config = (sprite, frame, z_index) => {
    sprite.texture.frame = new Rectangle(frame[0], frame[1], frame[2], frame[3]);
    sprite.position.z = z_index;
    return sprite;
};

// TODO: fix
export const mk_sprite_from_cache = (stage, loader, image_location, frame, z_index) => {
    const texture = loader.resources[image_location].texture;
    const sprite = new Sprite(texture);
    const new_sprite = set_sprite_config(sprite, frame);
    const new_stage = stage.addChild(new_sprite);
    return sprite;
};

export const render = (renderer, stage) => {
    renderer.render(stage);
};
