import * as keycode from 'keycode';
import * as ecs from 'engine/ecs';

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
    key_input = { ...initialize_key_input(), is_initialize: true };
};

export const system = state => {
    const entity_ids = ecs.entities_with_component(state, 'text');
    !key_input.is_initialize && init_input();
    return state;
};
