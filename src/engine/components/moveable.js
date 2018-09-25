export const mk_moveable_state = (move_rate, direction) => {
    return {
        offset_x: 0,
        offset_y: 0,
        move_rate: move_rate,
        direction: direction
    };
};

export const fn = (entity_id, component_state, messages) => {
    return component_state;
};
