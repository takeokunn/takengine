const keycode_movement = {
    W: { action: 'walk', direction: 'up' },
    S: { action: 'walk', direction: 'down' },
    A: { action: 'walk', direction: 'left' },
    D: { action: 'walk', direction: 'right' },
};
const keycode_action = {
    J: { action: 'fireball' },
    H: { action: 'spear' }
};

const input_move = input_state => {};

const input_attack = input_state => {};

export const react_to_input = (entity_id, component_state, messages) => {
    // const keyboard_input = messages.keyboard_input;
    // const last_input_state = { input_state: component_state };
    // const move_action = input_move(keyboard_input);
    // const attack_action = input_attack(keyboard_input);
    return component_state;
}
