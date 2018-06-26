import { event } from 'engine_systems';

const entities_with_component = (state, component_id) => state.components? state.components[component_id].entities : {};

export const get_system_fns = (state, system_ids) => system_ids.map(system_id => state.systems[system_id]);

const get_all_component_state = (state, component_id) => state.state[component_id];
const get_component = (state, component_id) => state.components[component_id];

const get_component_context = (state, queue, component, entity_id) => {
    const messages = get_subscribed_events(queue, entity_id, subscriptions);
};

const system_next_state_and_events = (state, component_id) => {
    // const entity_ids = entities_with_component(state, component_id);
    // const component_states = get_all_component_state(state, component_id);
    // console.log(component_states)
    // const component = get_component(state, component_id);
    // console.log(component)
    // const component_fn = component.fn;
    // const queue = state.events.queue;

    // const recursive = (entities, state_accum = {}, event_accum = []) => {
    //     if (entities.count === 0) {
    //         return {
    //             ...state,
    //             'state': {
    //                 ...state.state,
    //                 [component_id]: state_accum
    //             },
    //             'events': {
    //                 ...state.events,
    //                 ...event_accum
    //             }
    //         };
    //     }
    //     const entity_id = entities.shift();
    //     const component_state = component_states[entity_id];
    //     const context = get_component_context(state, queue, component, entity_id);
    //     const next_comp_state = component_fn(entity_id, component_state, context);

    //     const new_state = () => {
    //         if (next_comp_state.isArray()) {
    //             const { next_comp_state, events } = next_comp_state;
    //             events.map(event => event_accum.push(event));
    //         }
    //         return {
    //             ...state_accum,
    //             [entity_id]: next_comp_state
    //         };
    //     };

    //     return recursive(entities, new_state(), event_accum)
    // };

    // return recursive(entity_ids);
    return {
        ...state,
        state: {
            [component_id]: {}
        },
        events: []
    };
};

const mk_system_fn = component_id => now_state => {
    const { state, events } = system_next_state_and_events(now_state, component_id);
    event.emit_events(state, events);
    return now_state;
};

const mk_component = (state, opts) => {
    return {
        ...state,
        systems: {
            ...state.systems,
            [opts.uid]: mk_system_fn(opts.component.uid)
        },
        components: {
            ...state.components,
            [opts.component.uid]: {
                fn: opts.component.fn,
                subscriptions: opts.component.subscriptions,
                select_components: opts.component.select_components,
                cleanup_fn: opts.component.cleanup_fn,
            }
        }
    };
};

const mk_pure_system = (state, opts) => {
    return {
        ...state,
        systems: {
            ...state.systems,
            [opts.uid]: opts.fn
        }
    };
};

const mk_component_state = (game_state, component_id, entity_id, init_component_state = {}) => {
    const state = game_state.hasOwnProperty('state')? game_state.state : {};
    const component_id_status = state.hasOwnProperty(component_id)? state[component_id] : {};
    const entity_id_status = component_id_status.hasOwnProperty(entity_id)? component_id_status[entity_id] : {};
    return {
        ...game_state,
        state: {
            ...state,
            [component_id]: {
                ...component_id_status,
                [entity_id]: {
                    ...entity_id_status,
                    ...init_component_state
                }
            }
        }
    }
};

const component_state_from_spec = entity_id => (state, component) => {
    const component_uid = component.uid;
    const component_state = {
        entities: {
            ...state.entities,
            [entity_id]: param => ({ ...param, component_uid })
        },
        components: {
            ...state.components,
            [component_uid]: {
                entities: param => ({ ...param, entity_id })
            }
        }
    };
    return mk_component_state(state, component_uid, entity_id, component_state);
};

export const mk_entity = (state, opts) => {
    return opts.components.reduce((accum, component) => component_state_from_spec(opts.uid)(accum, component), state);
};

export const rm_entity = (state, opts) => ({ ...state });

export const mk_system = (state, opts) => {
    return opts.component? mk_component(state, opts) : mk_pure_system(state, opts);
};

export const mk_scene = (state, opts) => {
    return {
        ...state,
        scenes: {
            ...state.scenes,
            [opts.uid]: opts.systems
        }
    };
};

export const mk_current_scene = (state, opts) => {
    return {
        ...state,
        game: {
            ...state.game,
            scene_id: opts.uid
        }
    };
};

export const mk_renderer = (state, opts) => {
    return {
        ...state,
        game: {
            ...state.game,
            rendering_engine: {
                renderer: opts.renderer,
                stage: opts.stage
            }
        }
    };
};

export const mk_tiles_from_tilemap = (state, opts) => ({ ...state });
