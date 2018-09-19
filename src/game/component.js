import { animateable, attack, controllerable, damage, ephemeral, moveable, position, renderable, text } from 'engine_components';

export const component_state = [
    {
        type: 'component',
        opts: {
            uid: 'position',
            component: {
                fn: position.fn,
                select_systems: [],
                select_components: [],
                subscriptions: ['position_change'],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'controller',
            component: {
                fn: controllerable.react_to_input,
                select_systems: ['keyboard_input'],
                select_components: [],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'sprite',
            component: {
                fn: renderable.render_sprite,
                select_systems: [],
                select_components: ['position', 'animate'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'animate',
            component: {
                fn: animateable.animate,
                select_systems: [],
                select_components: ['action'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'text_sprite',
            component: {
                fn: renderable.render_text,
                select_systems: [],
                select_components: ['position', 'text'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'text',
            component: {
                fn: text.fn,
                select_systems: [],
                select_components: ['text_change'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'attack',
            component: {
                fn: attack.fn,
                select_systems: [],
                select_components: ['position'],
                subscriptions: ['action'],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'damage',
            component: {
                fn: damage.fn,
                select_systems: [],
                select_components: ['position'],
                subscriptions: ['collision'],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'ttl',
            component: {
                fn: ephemeral.update_ttl,
                select_systems: [],
                select_components: [],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'movement',
            component: {
                fn: moveable.fn,
                select_systems: [],
                select_components: [],
                subscriptions: ['move_change', 'collision'],
                cleanup_fn: () => {}
            }
        }
    },
];
