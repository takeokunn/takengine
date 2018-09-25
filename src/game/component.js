import { animateable, attack, controllerable, damage, ephemeral, moveable, position, renderable, text } from 'engine_components';

export const component_state = [
    {
        type: 'component',
        opts: {
            uid: 'position',
            component: {
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
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
                fn: state => state,
                select_systems: [],
                select_components: [],
                subscriptions: ['move_change', 'collision'],
                cleanup_fn: () => {}
            }
        }
    },
];
