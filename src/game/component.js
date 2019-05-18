import { controller, position, renderable, text } from 'engine_components';

export const component_state = (resources, renderer) => ([
    {
        type: 'component',
        opts: {
            uid: 'position',
            component: {
                fn: position.fn(resources, renderer),
                select_systems: [],
                select_components: ['controller'],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    },
    {
        type: 'component',
        opts: {
            uid: 'controller',
            component: {
                fn: controller.react_to_input,
                select_systems: ['key_input'],
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
                fn: renderable.sprite_fn,
                select_systems: [],
                select_components: ['position'],
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
                select_components: [],
                subscriptions: [],
                cleanup_fn: () => {}
            }
        }
    }
]);
