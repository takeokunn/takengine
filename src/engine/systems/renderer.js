import * as pixi from 'engine/pixi.js';

const sort_by_zindex = (a, b) => {
    return a.position.z - a.position.z;
}

export const system = state => {
    const renderer = state.game.rendering_engine.renderer;
    const stage = state.game.rendering_engine.stage;
    const new_stage = stage.children.sort(sort_by_zindex)
    pixi.render(renderer, stage);
    return state;
};
