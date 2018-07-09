import { animateable, attack, controllerable, damage, ephemeral, moveable, position, renderable, text } from 'engine_components';

export const component_state = [
    {
        type: 'system',
        opts: {
            uid: 'position',
            component: {
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
                fn: moveable.fn,
                select_components: [],
                subscriptions: ['move_change', 'collision'],
                cleanup_fn: () => {}
            }
        }
    },
];
