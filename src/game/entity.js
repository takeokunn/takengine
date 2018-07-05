import { player, enemy } from 'entities';

export const entity_state = (stage, loader) => ([
    {
        type: 'entity',
        opts: player.create(stage, loader, 'player1', 20, 20, 1000, 0, 0)
    },
    {
        type: 'entity',
        opts: enemy.create('enemy1')
    },
]);
