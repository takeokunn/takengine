import { regl } from 'engine_utils';

const glsl = ({
    frag: `
        precision mediump float;
        void main() {
            gl_FragColor = vec4(0, 0, 0, 1);
        }`,
    vert: `
        precision mediump float;
        attribute vec2 position;
        uniform vec2 offset;
        uniform vec2 scale;
        uniform float viewportWidth;
        uniform float viewportHeight;
        void main() {
            // windows ratio scaling factor.
            float r = (viewportWidth) / (viewportHeight);
            gl_Position = vec4(position.xy * scale * vec2(1.0, r) + offset, 0, 1);
        }`,
    attributes: {
        position: [
            [-1, -1], [+1, +1], [-1, +1],
            [-1, -1], [+1, -1], [+1, +1]
        ]
    },
    uniforms: {
        offset: (_, props) => props.aabb.c,
        scale: (_, props) => props.aabb.r,
        viewportWidth: regl.get_context.viewportWidth,
        viewportHeight: regl.get_context.viewportHeight,
    },
    depth: {
        enable: false
    },
    cull: {
        enable: true
    },
    count: 6
});

export const renderer_state = renderer =>([
    {
        type: 'renderer',
        opts: {
            renderer: renderer(glsl),
            stage: () => {}
        }
    }
]);
