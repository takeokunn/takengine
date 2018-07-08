import { position, renderable } from 'engine_components';

const glsl = {
    frag: `
        precision mediump float;
        uniform vec4 color;
        void main () {
            gl_FragColor = color;
        }`,
    vert: `
        precision mediump float;
        attribute vec2 position;
        void main () {
            gl_Position = vec4(position, 0, 1);
        }`,
    attributes: {
        position: [
            [-1, 0],
            [0, -1],
            [1, 1]
        ]
    },
    uniforms: {
        color: [1, 0, 0, 1]
    },
    count: 3
};

export const create = uid => {
    return {
        uid: uid,
        systems: [
            {
                uid: 'keyboard_input'
            },
        ],
        components: [
            {
                uid: 'sprite',
                state: glsl
            },
        ]
    }
};
