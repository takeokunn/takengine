import { blob, door, dungeon, explorer, treasure } from 'entities';

export const entity_state = (loader, resources, stage) => ([
    {
        type: 'entity',
        opts: dungeon.create('dungeon', loader, resources['dungeon'], stage.main)
    },
    {
        type: 'entity',
        opts: blob.create('blob', loader, resources['blob'], stage.main)
    },
    {
        type: 'entity',
        opts: door.create('door', loader, resources['door'], stage.main)
    },
    {
        type: 'entity',
        opts: explorer.create('explorer', loader, resources['explorer'], stage.main)
    },
    {
        type: 'entity',
        opts: treasure.create('treasure', loader, resources['treasure'], stage.main)
    },
]);
