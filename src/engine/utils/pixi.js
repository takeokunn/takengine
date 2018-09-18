import * as PIXI from 'pixi.js'

/**
 * TODO: Fix
 */
const set_sprite_property = (sprite, frame, z_index) => {
    // const bounds = new PIXI.Rectangle(frame[0], frame[1], frame[2], frame[4]);
    // sprite.texture.frame = bounds;
    sprite.position.z = z_index;
    return sprite;
};

export const initialize_renderer = (width, height, background_color) => {
    const app = new PIXI.autoDetectRenderer(width, height, { backgroundColor : background_color });
    document.body.appendChild(app.view);
    return app;
};

export const mk_stage = () => new PIXI.Container();

export const loader = (manifest, onLoad) => {
    Object.keys(manifest).reduce((accum, index) => accum.add(index, manifest[index].src), PIXI.loader).load(onLoad);
};

export const mk_sprite_state = name => PIXI.Sprite.fromImage(name);

export const render = (renderer, stage) => renderer.render(stage);

export const mk_sprite_from_cache = (loader, stage, img_path, frame = [0, 0, 0, 0], z_index = 1) => {
    const cached_texture = loader.resources[img_path].texture;
    const texture = new PIXI.Texture(cached_texture.baseTexture);
    const sprite = new PIXI.Sprite(texture);
    const new_sprite = set_sprite_property(sprite, frame);
    stage.addChild(new_sprite);
    return sprite;
};
