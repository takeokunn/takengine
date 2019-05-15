import * as get from './get';
import * as ev from '../events';

/**
 * for system and components
 */
const get_component_context = (state, queue, component, entity_id) => {
    const initial_context = { inbox: messages, components: {}, systems: {} };
    const messages = ev.get_subscribed(queue, entity_id, component.subscriptions);
    const component_cb = (context, comp_id) => ({
        ...context,
        components: {
            ...context.compone,
            [comp_id]: get.state_component_component_id_entity_id(state, comp_id, entity_id)
        }
    });
    const system_cb = (context, sys_id) => ({
        ...context,
        systems: {
            ...context.systems,
            [sys_id]: get.state_system_system_id(state, sys_id)
        }
    });
    const component_context = component.select_components.reduce(component_cb, initial_context);
    return component.select_systems.reduce(system_cb, component_context);
};

const component_next_state_and_events = (game_state, component_id) => {
    const state = game_state.state;
    const entity_ids = get.component_component_id_entities(game_state, component_id);
    const component_states = get.state_component_component_id(game_state, component_id);
    const component = get.component_component_id(game_state, component_id);
    const event_queue = get.events_queue(game_state);

    const cb = (accum, entity_id) => {
        const now_component_state = component_states[entity_id];
        const context = get_component_context(game_state, event_queue, component, entity_id);
        const { new_component_state, events } = component.fn(entity_id, now_component_state, context);
        return {
            ...accum,
            state: {
                ...state,
                component: {
                    ...state.component,
                    [component_id]: {
                        ...component_states,
                        [entity_id]: new_component_state
                    }
                }
            },
            events: {
                ...accum.events,
                queue: [...accum.events.queue, ...events]
            }
        };
    };

    return entity_ids.reduce(cb, game_state);
};

const mk_component_fn = component_id => now_state => {
    const new_state = component_next_state_and_events(now_state, component_id);
    return ev.emit_events(new_state);
};

export const mk_component = (state, opts) => {
    return {
        ...state,
        components: {
            ...state.components,
            [opts.uid]: {
                ...state.components[opts.uid],
                update_fn: mk_component_fn(opts.uid),
                fn: opts.component.fn,
                subscriptions: opts.component.subscriptions,
                select_systems: opts.component.select_systems,
                select_components: opts.component.select_components,
                cleanup_fn: opts.component.cleanup_fn,
            }
        }
    };
};

export const mk_system = (state, opts) => {
    return {
        ...state,
        systems: {
            ...state.systems,
            [opts.uid]: {
                fn: opts.fn
            }
        }
    };
};

/**
 * for entities
 */
const mk_component_state = (game_state, component_id, entity_id, init_component_state = {}) => {
    const state = game_state.state;
    const component = game_state.state.component;
    const component_id_status = get.state_component_component_id(game_state, component_id);
    const entity_id_status = get.state_component_component_id_entity_id(game_state, component_id, entity_id);
    return {
        ...game_state,
        state: {
            ...state,
            component: {
                ...component,
                [component_id]: {
                    ...component_id_status,
                    [entity_id]: {
                        ...entity_id_status,
                        ...init_component_state
                    }
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

export const mk_entity = (game_state, opts) => {
    return opts.components.reduce((accum, component) => component_state_from_spec(opts.uid)(accum, component), game_state);
};

/**
 * for scene
 */
export const mk_scene = (state, opts) => {
    return {
        ...state,
        scenes: {
            ...state.scenes,
            [opts.uid]: {
                systems: opts.systems,
                components: opts.components,
                stage: opts.stage
            }
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
                stages: opts.stages
            }
        }
    };
};
