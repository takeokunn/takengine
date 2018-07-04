import { animateable, attack, controllerable, damage, ephemeral, moveable, position, renderable, text } from 'engine_components';

export const component_state = [
    {
        type: 'system',
        opts: {
            uid: 'position',
            component: {
                uid: 'position',
                fn: position.fn,
                select_components: [],
                subscriptions: ['position_change'],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'controller',
            component: {
                uid: 'controller',
                fn: controllerable.react_to_input,
                select_components: ['keyboard_input'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'sprite',
            component: {
                uid: 'sprite',
                fn: renderable.render_sprite,
                select_components: ['position', 'animateable'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'animate',
            component: {
                uid: 'animateable',
                fn: animateable.animate,
                select_components: ['action'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'text_sprite',
            component: {
                uid: 'text_sprite',
                fn: renderable.render_text,
                select_components: ['position', 'text'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'text',
            component: {
                uid: 'text',
                fn: text.fn,
                select_components: ['text_change'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'attack',
            component: {
                uid: 'attack',
                fn: attack.fn,
                select_components: ['position'],
                subscriptions: ['action'],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'damage',
            component: {
                uid: 'damage',
                fn: damage.fn,
                select_components: ['position'],
                subscriptions: ['collision'],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'ttl',
            component: {
                uid: 'ttl',
                fn: ephemeral.update_ttl,
                select_components: [],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'system',
        opts: {
            uid: 'movement',
            component: {
                uid: 'moveable',
                fn: moveable.fn,
                select_components: [],
                subscriptions: ['move_change', 'collision'],
                cleanup_fn: () => {}
            }
        }
    },
];
