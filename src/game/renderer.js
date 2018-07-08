export const renderer_state = renderer =>([
    {
        type: 'renderer',
        opts: {
            renderer: renderer,
            stage: () => {}
        }
    }
]);
