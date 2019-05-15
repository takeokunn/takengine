import { pixi } from 'engine_utils';

export const renderer_state = (renderer, stages) => ([
    {
        type: 'renderer',
        opts: {
            renderer: renderer,
            stages: stages
        }
    }
]);
