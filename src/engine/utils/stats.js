import Stats from 'stats.js';

export const create = () => {
    const node = document.getElementsByTagName('canvas')[0];
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    return stats;
};

export const wrap_fps = stats => (fn, state) => {
    stats.begin();
    const new_state = fn(state);
    stats.end();
    return new_state;
};
