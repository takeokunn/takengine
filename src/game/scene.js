export const scene_state = [
    {
        type: 'current_scene',
        opts: {
            uid: 'default'
        }
    },
    {
        type: 'scene',
        opts: {
            uid: 'default',
            systems: [
                'keyboard_input',
                'controller',
                'entity_collision',
                'tilemap_collision',
                'movement',
                'position',
                'attack',
                'damage',
                'ttl',
                'tiles',
                'replay',
                'meta',
                'animate',
                'sprite',
                'text',
                'text_sprite',
                'audio',
                'render',
                'events',
            ]
        }
    }
];
