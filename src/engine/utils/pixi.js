import * as PIXI from 'pixi.js'

export const initialize_renderer = (width, height, background_color) => {
    const app = new PIXI.autoDetectRenderer(width, height, { backgroundColor : background_color });
    document.body.appendChild(app.view);
    return app;
};

export const mk_stage = () => new PIXI.Container();

export const mk_text_style = params => new PIXI.TextStyle(params);

export const mk_text = (text, style) => new PIXI.Text(text, style);

export const loader = (manifest, onLoad) => {
    Object.keys(manifest).reduce((accum, index) => accum.add(index, manifest[index].src), PIXI.loader).load(onLoad);
};

export const mk_sprite_state = name => PIXI.Sprite.fromImage(name);

export const render = (renderer, stage) => renderer.render(stage);

export const mk_sprite = (loader, stage, img_path) => {
    const sprite = new PIXI.Sprite(loader.resources[img_path].texture);
    stage.addChild(sprite);
    return sprite;
};

