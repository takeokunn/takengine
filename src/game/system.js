import { audio, collision, event, input, meta, renderer, replay, tiles } from 'engine_systems';

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
            uid: 'meta',
            fn: meta.system
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
            uid: 'entity_collision',
            fn: collision.mk_entity_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'tilemap_collision',
            fn: collision.mk_tilemap_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'replay',
            fn: replay.system
        }
    },
];
