import vec2 from 'gl-vec2';

export const mk_position_state = (x_0, x_1, y_0, y_1, z_index = 1) => ({
    x: vec2.fromValues(x_0, x_1),
    y: vec2.fromValues(y_0, y_1),
    z_index: z_index,
});

export const fn = (entity_id, component_state, messages) => {
    return {
        component_state: component_state,
        events: [],
    };
}
