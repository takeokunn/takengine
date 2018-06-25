import { init_state } from './game';

import { game_loop, mk_game_state } from 'engine/core';

const main = () => game_loop(mk_game_state(init_state));

main();
