import { player } from 'entities';

export const entity_state = (loader, resources, stage) => ([
    {
        type: 'entity',
        opts: player.create('player1', loader, resources['player'], stage)
    }
]);
