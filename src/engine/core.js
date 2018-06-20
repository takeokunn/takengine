import * as ecs from './ecs';

const mk_state = {
    entity: state => ecs.mk_entity(state),
    entity_remove: state => ecs.rm_entity(state),
    component: state => ecs.mk_component(state),
    system: state => ecs.mk_system(state),
    scene: state => ecs.mk_scene(state),
    current_scene: state => ecs.mk_current_scene(state),
    renderer: state => ecs.mk_renderer(state),
    tilemap: state => ecs.mk_tiles_from_tilemap(state),
    script: state => state.opts.fn()
};

const mk_state_dispatcher = state => mk_state[state.type](state);

const next_state = game_state => {
    console.log(game_state);
    return game_state;
};

export const mk_game_state = states => states.map(state => mk_state_dispatcher(state));

export const game_loop = game_state => requestAnimationFrame(game_loop.bind(this, next_state(game_state)));
