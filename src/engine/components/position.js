const speed = 5;

export const mk_position_state = (map_x, map_y) => ({
    map_x: map_x,
    map_y: map_y
});

export const set_position = (component_state, move_action, renderer) => {
    switch (move_action.direction) {
    case 'up':
        return mk_position_state(
            component_state.map_x,
            component_state.map_y - speed > 32? component_state.map_y - speed : 32
        );
    case 'down':
        return mk_position_state(
            component_state.map_x,
            component_state.map_y + speed < renderer.height - 64? component_state.map_y + speed : renderer.height - 64
        );
    case 'left':
        return mk_position_state(
            component_state.map_x - speed > 32? component_state.map_x - speed : 32,
            component_state.map_y
        );
    case 'right':
        return mk_position_state(
            component_state.map_x + speed < renderer.width - 50? component_state.map_x + speed : renderer.width - 50,
            component_state.map_y
        );
    default:
        return mk_position_state(component_state.map_x, component_state.map_y);
    }
};

export const fn = renderer => (entity_id, component_state, messages) => {
    const move_action = messages.components.controller.move_action || { direction: '' };
    const new_state = set_position(component_state, move_action, renderer);
    return {
        new_component_state: new_state,
        events: []
    };
};
