import * as get from './get';
import * as ev from '../events';

/**
 * for system and components
 */
const get_component_context = (state, queue, component, entity_id) => {
    const messages = ev.get_subscribed(queue, entity_id, component.subscriptions);
    const cb = (context, comp) => ({
        ...context,
        [comp]: get.state_component_id_entity_id(state, comp, entity_id)
    });
    return component.select_components.reduce(cb, { inbox: messages })
};

const system_next_state_and_events = (game_state, component_id) => {
    const entity_ids = get.component_component_id_entities(game_state, component_id);
    const component_states = get.state_component_id(game_state, component_id);
    const component = get.component_component_id(game_state, component_id);
    const event_queue = get.events_queue(game_state);

    const cb = (accum, entity_id) => {
        const now_component_state = component_states[entity_id];
        const context = get_component_context(game_state, event_queue, component, entity_id);
        const { component_state, events } = component.fn(entity_id, now_component_state, context);
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
    const new_state = system_next_state_and_events(now_state, component_id);
    return ev.emit_events(new_state);
};

const mk_component = (state, opts) => {
    return {
        ...state,
        systems: {
            ...state.systems,
            [opts.uid]: {
                fn: mk_system_fn(opts.uid)
            }
        },
        components: {
            ...state.components,
            [opts.uid]: {
                ...state.components[opts.uid],
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

export const mk_system = (state, opts) => {
    return opts.component? mk_component(state, opts) : mk_pure_system(state, opts);
};

/**
 * for entities
 */
const system_state_from_spec = entity_id => (state, system) => {
    const system_uid = system.uid;
    const entity_entity_id = [...get.entities_entity_id(state, entity_id), system_uid];
    const systems_entities = [...get.system_system_id_entities(state, system_uid), entity_id];
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
    const state = game_state.state;
    const component_id_status = get.state_component_id(game_state, component_id);
    const entity_id_status = get.state_component_id_entity_id(game_state, component_id, entity_id);
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
    const component_state = component.state || {};
    const new_state = mk_component_state(state, component_uid, entity_id, component_state)
    const entity_entity_id = [...get.entities_entity_id(new_state, entity_id), component_uid];
    const comopnent_entities = [...get.component_component_id_entities(new_state, component_uid), entity_id];
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

/**
 * for scene
 */
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

/**
 * for renderer
 */
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
