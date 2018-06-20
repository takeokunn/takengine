const init_events_system = () => console.log('init_events_system');

export const init_state = [
    {
        type: 'renderer',
        opts: {
            renderer: () => {},
            // renderer: renderer,
            stage: () => {},
            // stage: stage,
        }
    },
    {
        type: 'script',
        opts: {
            fn: init_events_system
        }
    },
    {
        type: 'entity',
        opts: {
            renderer: () => {},
            stage: () => {},
            loader: () => {},
            tilemap: () => {}
            // renderer: renderer,
            // stage: stage,
            // loader: loader,
            // tilemap: tilemap
        }
    },
    {
        type: 'entity',
        opts: () => {},
        // opts: create_player
    },
    {
        type: 'entity',
        opts: {
            fn: () => {}
            // fn: create_enemy
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
    },
    {
        type: 'current_scene',
        opts: {
            uid: 'default'
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'events',
            fn: () => {}
            // fn: event_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'keyboard_input',
            fn: () => {}
            // fn: keyboard_input_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'position',
            component: {
                uid: 'position',
                fn: () => {},
                // fn: position,
                subscriptions: ['position_change']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'meta',
            fn: () => {}
            // fn: meta_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'controller',
            component: {
                uid: 'controller',
                fn: () => {},
                // fn: react_to_input,
                select_components: ['keyboard_input']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'tiles',
            fn: () => {}
            // fn: tile_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'render',
            fn: () => {}
            // fn: render_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'audio',
            fn: () => {}
            // fn: audio_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'sprite',
            component: {
                uid: 'sprite',
                fn: () => {},
                // fn: render_sprite,
                select_components: ['position', 'animateable'],
                cleanup_fn: () => {}
                // cleanup_fn: cleanup_sprite_state
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'animate',
            component: {
                uid: 'animateable',
                fn: () => {},
                // fn: animate,
                select_components: ['action']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'text_sprite',
            component: {
                uid: 'text_sprite',
                fn: () => {},
                // fn: render_text,
                select_components: ['position', 'text'],
                cleanup_fn: () => {}
                // cleanup_fn: cleanup_text_state
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'text',
            component: {
                uid: 'text',
                fn: () => {},
                // fn: text,
                select_components: ['text_change']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'entity_collision',
            fn: () => {},
            // fn: mk_entity_collision_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'tilemap_collision',
            fn: () => {},
            // fn: mk_tilemap_collision_system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'attack',
            component: {
                uid: 'attack',
                fn: () => {},
                // fn: attack,
                select_components: ['position'],
                subscriptions: ['action']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'damage',
            component: {
                uid: 'damage',
                fn: () => {},
                // fn: damage,
                select_components: ['position'],
                subscriptions: ['collision']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'ttl',
            component: {
                uid: 'ttl',
                fn: () => {},
                // fn: update_ttl,
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'movement',
            component: {
                uid: 'moveable',
                fn: () => {},
                // fn: move,
                subscriptions: ['move_change', 'collision']
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'replay',
            fn: () => {},
            // fn: replay_system
        }
    },
];
