const speed = 5;

export const mk_position_state = (map_x, map_y) => ({
    map_x: map_x,
    map_y: map_y
});

const explorer_position = {
    up: map_y => map_y - speed > 32? map_y - speed : 32,
    down: (renderer, map_y, texture) => map_y + speed < renderer.height - 32 - texture.height? map_y + speed : renderer.height - 32 - texture.height,
    left: map_x => map_x - speed > 32? map_x - speed : 32,
    right: (renderer, map_x, texture) => map_x + speed < renderer.width - 32 - texture.width? map_x + speed : renderer.width - 32 - texture.width,
};

export const set_explorer_position = (component_state, move_action, texture, renderer) => {
    switch (move_action.direction) {
    case 'up':
        return mk_position_state(component_state.map_x, explorer_position.up(component_state.map_y));
    case 'down':
        return mk_position_state(component_state.map_x, explorer_position.down(renderer, component_state.map_y, texture));
    case 'left':
        return mk_position_state(explorer_position.left(component_state.map_x), component_state.map_y);
    case 'right':
        return mk_position_state(explorer_position.right(renderer, component_state.map_x, texture), component_state.map_y);
    default:
        return mk_position_state(component_state.map_x, component_state.map_y);
    }
};

export const fn = (resources, renderer) => (entity_id, component_state, messages) => {
    const move_action = messages.components.controller.move_action || { direction: '' };
    const new_state = entity_id === 'explorer'? set_explorer_position(component_state, move_action, resources['explorer'].texture, renderer) : component_state;
    return {
        new_component_state: new_state,
        events: []
    };
};
