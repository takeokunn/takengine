import { pixi } from 'engine_utils';

export const system = state => {
    const renderer = state.game.rendering_engine.renderer;
    const stage = state.game.rendering_engine.stage;
    pixi.render(renderer, stage);
    return state;
};
