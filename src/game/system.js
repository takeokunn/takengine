import { audio, collision, event, input, renderer, tiles } from 'engine_systems';

export const system_state = [
    {
        type: 'system',
        opts: {
            uid: 'events',
            fn: event.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'key_input',
            fn: input.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'tiles',
            fn: tiles.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'render',
            fn: renderer.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'audio',
            fn: audio.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'collision',
            fn: collision.system
        }
    }
];
