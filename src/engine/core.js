import * as ecs from 'engine/ecs';
import { tiles } from 'engine_systems';

const initial_game_state = {
    components: {},
    entities: {},
    events: { queue: [] },
    game: {},
    scenes: {},
    state: {},
    systems: {},
};

const mk_state = {
    entity: (state, opts) => ecs.mk_entity(state, opts),
    entity_remove: (state, opts) => ecs.rm_entity(state, opts),
    system: (state, opts) => ecs.mk_system(state, opts),
    scene: (state, opts) => ecs.mk_scene(state, opts),
    current_scene: (state, opts) => ecs.mk_current_scene(state, opts),
    renderer: (state, opts) => ecs.mk_renderer(state, opts),
    tilemap: (state, opts) => tiles.mk_tiles_from_tilemap(state, opts.renderer, opts.stage, opts.loader, opts.tilemap)
};

const mk_state_dispatcher = (state, spec) => mk_state[spec.type](state, spec.opts);

const next_state = game_states => {
    const scene_id = game_states.game.scene_id;
    const update_fn = game_states.game.update_fns[scene_id];
    return update_fn(game_states);
};

export const mk_game_state = game_states => {
    const new_state = game_states.reduce((state, spec) => mk_state_dispatcher(state, spec), initial_game_state);
    const scene_id = new_state.game.scene_id;
    const systems = new_state.scenes[scene_id];
    const system_fns = ecs.get_system_fns(new_state, systems);
    const update_fn = old_state => system_fns.reduce((status, system_fn) => system_fn(status), old_state);
    return {
        ...new_state,
        game: {
            ...new_state.game,
            update_fns: {
                ...new_state.game.update_fns,
                [scene_id]: update_fn
            }
        }
    };
};

export const game_loop = game_states => requestAnimationFrame(game_loop.bind(this, next_state(game_states)));
