import regl_fn from 'regl';

export const regl = regl_fn();

const clear = () => regl.clear({ color: [0, 0, 0, 0], depth: 1 });

export const get_context = {
    viewportWidth: regl.context('viewportWidth'),
    viewportHeight: regl.context('viewportHeight'),
};

export const exec = fn => {
    regl.frame(() => {
        clear();
        fn();
    });
};
