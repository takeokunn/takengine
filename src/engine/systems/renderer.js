import { pixi } from 'engine_utils';

export const system = state => {
    const key_input = state.state.system.key_input;
    const scene_id = key_input["x"]? 'start' : key_input["y"]? 'main' : key_input["z"]? 'result' : state.game.scene_id;
    const renderer = state.game.rendering_engine.renderer;
    const stages = state.game.rendering_engine.stages;
    pixi.render(renderer, stages[scene_id]);
    return {
        ...state,
        game: {
            ...state.game,
            scene_id: scene_id
        }
    };
};
