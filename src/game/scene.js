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
                'entity_collision',
                'tilemap_collision',
                'audio',
                'render',
            ],
            components: [
                'controller',
                'movement',
                'position',
                'attack',
                'damage',
                'ttl',
                'sprite'
            ]
        }
    }
];
