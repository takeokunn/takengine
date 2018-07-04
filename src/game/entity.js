import { player, enemy } from 'entities';

export const entity_state = [
    {
        type: 'entity',
        opts: player.create('player1')
    },
    {
        type: 'entity',
        opts: enemy.create('enemy1')
    },
];
