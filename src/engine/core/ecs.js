import * as ev from './events';

export const entities_with_component = (game_state, component_id) => {
    const state = game_state.components.hasOwnProperty(component_id)? game_state.components[component_id] : {};
    return state.hasOwnProperty('entities')? state.entities : []
};

export const entities_with_system = (game_state, system_id) => {
    const state = game_state.systems.hasOwnProperty(system_id)? game_state.systems[system_id] : {};
    return state.hasOwnProperty('entities')? state.entities : [];
};

export const get_system_fns = (state, system_ids) => system_ids.map(system_id => state.systems[system_id].fn);

const get_all_component_state = (game_state, component_id) => {
    const state = game_state.hasOwnProperty('state')? game_state.state : {};
    return state.hasOwnProperty(component_id)? state[component_id] : {};
};
const get_component = (game_state, component_id) => {
    const state_components = game_state.hasOwnProperty('components')? game_state.components : {};
    return state_components.hasOwnProperty(component_id)? state_components[component_id] : {};
};

const get_component_state = (game_state, component_id, entity_id) => {
    const state = game_state.hasOwnProperty('state')? game_state.state : {};
    const state_component_id = state.hasOwnProperty(component_id)? state.component_id : {};
    return state_component_id.hasOwnProperty(entity_id)? state_component_id.entity_id : {};
};

const get_component_context = (state, queue, component, entity_id) => {
    const messages = ev.get_subscribed_events(queue, entity_id, component.subscriptions);
    const cb = (context, comp) => ({
        ...context,
        [comp]: get_component_state(state, component, entity_id)
    });
    return component.select_components.reduce(cb, { inbox: messages })
};

export const get_state_key_input_entity = (game_state, entity_id) => {
    const key_input = game_state.state.hasOwnProperty('key_input')? game_state.state.key_input : {};
    return key_input.hasOwnProperty('entity_id')? key_input[entity_id] : {};
};

const system_next_state_and_events = (game_state, component_id) => {
    const entity_ids = entities_with_component(game_state, component_id);
    const component_states = get_all_component_state(game_state, component_id);
    const component = get_component(game_state, component_id);
    const component_fn = component.fn;
    const event_queue = game_state.hasOwnProperty('events')? game_state.events.queue : [];

    const cb = (accum, entity_id) => {
        const now_component_state = component_states[entity_id];
        const context = get_component_context(game_state, event_queue, component, entity_id);
        const { component_state, events } = component_fn(entity_id, now_component_state, context);
        return {
            ...accum,
            state: {
                ...accum.state,
                [entity_id]: component_state
            },
            events: {
                ...accum.events,
                queue: [...accum.events.queue, ...events]
            }
        };
    };

    return entity_ids.reduce(cb, game_state);
};

const mk_system_fn = component_id => now_state => {
    const state = system_next_state_and_events(now_state, component_id);
    return state;
    // return ev.emit_events(state, events);
};

const mk_component = (state, opts) => {
    return {
        ...state,
        systems: {
            ...state.systems,
            [opts.uid]: {
                fn: mk_system_fn(opts.component.uid)
            }
        },
        components: {
            ...state.components,
            [opts.component.uid]: {
                ...state.components[opts.component.uid],
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
            [opts.uid]: {
                fn: opts.fn
            }
        },
        components: {
            ...state.components,
            [opts.uid]: {
                ...state.components[opts.uid],
                fn: opts.fn,
            }
        }
    };
};

const system_state_from_spec = entity_id => (state, system) => {
    const system_uid = system.uid;
    const entity_entity_id = state.entities.hasOwnProperty(entity_id)
        ? [...state.entities[entity_id], system_uid]
        : [system_uid];
    const systems_entities = state.systems[system_uid].hasOwnProperty('entities')
        ? [...state.systems[system_uid].entities, entity_id]
        : [entity_id];
    return {
        ...state,
        entities: {
            ...state.entities,
            [entity_id]: entity_entity_id
        },
        systems: {
            ...state.systems,
            [system_uid]: {
                ...state.systems[system_uid],
                entities: systems_entities,
            }
        }
    };
}

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
    const component_state = component.state;
    const new_state = mk_component_state(state, component_uid, entity_id, component_state)
    const entity_entity_id = new_state.entities.hasOwnProperty(entity_id)
        ? [...new_state.entities[entity_id], component_uid]
        : [component_uid];
    const comopnent_entities = new_state.components[component_uid].hasOwnProperty('entities')
        ? [...new_state.components[component_uid].entities, entity_id]
        : [entity_id];

    return {
        ...new_state,
        entities: {
            ...new_state.entities,
            [entity_id]: entity_entity_id
        },
        components: {
            ...new_state.components,
            [component_uid]: {
                ...new_state.components[component_uid],
                entities: comopnent_entities,
            }
        }
    };
};

export const mk_entity = (state, opts) => {
    const tmp_state = opts.systems.reduce((accum, system) => system_state_from_spec(opts.uid)(accum, system), state);
    return opts.components.reduce((accum, component) => component_state_from_spec(opts.uid)(accum, component), tmp_state);
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
