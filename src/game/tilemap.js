export const tilemap_state = (renderer, stage, loader) => ([
    {
        type: 'tilemap',
        opts: {
            renderer: renderer,
            stage: stage,
            loader: loader,
            tilemap: () => {}
            // tilemap: tilemap
        }
    }
]);
