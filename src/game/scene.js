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
                'key_input',
                'render'
            ],
            components: [
                'controller',
                'position',
                'sprite'
            ]
        }
    }
];
