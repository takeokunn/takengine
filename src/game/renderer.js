import { pixi } from 'engine_utils';

export const renderer_state = (renderer, stage) => ([
    {
        type: 'renderer',
        opts: {
            renderer: renderer,
            stage: stage
        }
    }
]);
