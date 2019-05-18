import { blob, door, dungeon, explorer, treasure } from 'entities';

export const entity_state = (loader, resources, renderer, stage) => ([
    {
        type: 'entity',
        opts: dungeon.create('dungeon', loader, resources['dungeon'], stage.main)
    },
    {
        type: 'entity',
        opts: blob.create(1, 'blob1', loader, resources['blob'], stage.main)
    },
    {
        type: 'entity',
        opts: blob.create(2, 'blob2', loader, resources['blob'], stage.main)
    },
    {
        type: 'entity',
        opts: blob.create(3, 'blob3', loader, resources['blob'], stage.main)
    },
    {
        type: 'entity',
        opts: door.create('door', loader, resources['door'], stage.main)
    },
    {
        type: 'entity',
        opts: treasure.create('treasure', loader, resources['treasure'], renderer, stage.main)
    },
    {
        type: 'entity',
        opts: explorer.create('explorer', loader, resources['explorer'], renderer, stage.main)
    },
]);
