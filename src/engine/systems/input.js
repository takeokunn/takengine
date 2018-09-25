import * as keycode from 'keycode';
import { ecs } from 'engine_core';

let key_input = { is_initialize: false };
const initialize_key_input = () => Object.keys(keycode.codes).reduce((accum, code) => ({ ...accum, [code]: false }), key_input);

const keydown = e => {
    e.preventDefault();
    const key = keycode.default(e);
    key_input = { ...key_input, [key]: true };
};

const keyup = e => {
    e.preventDefault();
    const key = keycode.default(e);
    key_input = { ...key_input, [key]: false };
};

const init_input = () => {
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    key_input = { is_initialize: true, ...initialize_key_input() };
};

export const system = state => {
    const entity_ids = ecs.get.system_system_id_entities(state, 'keyboard_input');
    !key_input.is_initialize && init_input();
    return {
        ...state,
        state: {
            ...state.state,
            system: {
                ...state.state.system,
                key_input: key_input
            }
        }
    };
};
