/**
 * for component
 */
export const component_component_id = (game_state, component_id) => {
    const state_components = game_state.hasOwnProperty('components')? game_state.components : {};
    return state_components.hasOwnProperty(component_id)? state_components[component_id] : {};
};

export const component_component_id_entities = (game_state, component_id) => {
    const state = game_state.components.hasOwnProperty(component_id)? game_state.components[component_id] : {};
    return state.hasOwnProperty('entities')? state.entities : []
};

/**
 * for system
 */
export const system_system_id_entities = (game_state, system_id) => {
    const state = game_state.systems.hasOwnProperty(system_id)? game_state.systems[system_id] : {};
    return state.hasOwnProperty('entities')? state.entities : [];
};

export const system_fns = (state, system_ids) => {
    return system_ids.map(system_id => state.systems[system_id].fn);
};

export const component_fns = (state, component_ids) => {
    return component_ids.map(component_id => state.components[component_id].fn);
};

/**
 * for state
 */
export const state_system_system_id = (game_state, system_id) => {
    return game_state.state.system.hasOwnProperty(system_id)? game_state.state.system[system_id] : {};
};

export const state_component_component_id = (game_state, component_id) => {
    return game_state.state.component.hasOwnProperty(component_id)? game_state.state.component[component_id] : {};
};

export const state_component_component_id_entity_id = (game_state, component_id, entity_id) => {
    const state_component_id = game_state.state.component.hasOwnProperty(component_id)? game_state.state.component[component_id] : {};
    return state_component_id.hasOwnProperty(entity_id)? state_component_id[entity_id] : {};
};

/**
 * for events
 */
export const events_queue = game_state => {
    return game_state.events.queue;
};

/**
 * for entities
 */
export const entities_entity_id = (game_state, entity_id) => {
    return game_state.entities.hasOwnProperty(entity_id)? game_state.entities[entity_id] : [];
};
