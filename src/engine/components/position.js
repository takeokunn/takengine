export const mk_position_state = (map_x, map_y, screen_x, screen_y, screen_z) => ({
    map_x: map_x,
    map_y: map_y,
    screen_x: screen_x,
    screen_y: screen_y,
    screen_z: screen_z
});

export const fn = (entity_id, component_state, messages) => {
    const inbox = messages.inbox;
    return {
        component_state: component_state,
        events: [],
    };
}
