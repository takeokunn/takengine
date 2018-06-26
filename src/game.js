import { player, enemy } from 'entities';
import { attack, animateable } from 'engine_components';
import { audio, collision, event, input, meta, renderer, replay, tiles } from 'engine_systems';

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
        type: 'tilemap',
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
        opts: player.create('player1')
    },
    {
        type: 'entity',
        opts: enemy.create('enemy1')
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
            fn: event.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'keyboard_input',
            fn: input.system
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'position',
            component: {
                uid: 'position',
                fn: state => state,
                // fn: position,
                subscriptions: ['position_change']
            }
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
            uid: 'controller',
            component: {
                uid: 'controller',
                fn: state => state,
                // fn: react_to_input,
                select_components: ['keyboard_input']
            }
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
            uid: 'sprite',
            component: {
                uid: 'sprite',
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
                // fn: text,
                select_components: ['text_change']
            }
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
            uid: 'attack',
            component: {
                uid: 'attack',
                fn: attack.system,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
                // fn: move,
                subscriptions: ['move_change', 'collision']
            }
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
