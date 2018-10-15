export const mk_position_state = (map_x, map_y, screen_x, screen_y, screen_z) => ({
    map_x: map_x,
    map_y: map_y,
    screen_x: screen_x,
    screen_y: screen_y,
    screen_z: screen_z
});

export const set_position = (component_state, move_action) => {
    switch (move_action.direction) {
        case 'up':
            return mk_position_state(component_state.map_x, component_state.map_y - 1, component_state.screen_x, component_state.screen_y, component_state.screen_z)
        case 'down':
            return mk_position_state(component_state.map_x, component_state.map_y + 1, component_state.screen_x, component_state.screen_y, component_state.screen_z)
        case 'left':
            return mk_position_state(component_state.map_x - 1, component_state.map_y, component_state.screen_x, component_state.screen_y, component_state.screen_z)
        case 'right':
            return mk_position_state(component_state.map_x + 1, component_state.map_y, component_state.screen_x, component_state.screen_y, component_state.screen_z)
        default:
            return mk_position_state(component_state.map_x, component_state.map_y, component_state.screen_x, component_state.screen_y, component_state.screen_z)
    }
};

export const fn = (entity_id, component_state, messages) => {
    const move_action = messages.components.controller.move_action;
    const new_state = set_position(component_state, move_action);
    return {
        new_component_state: new_state,
        events: []
    };
}
