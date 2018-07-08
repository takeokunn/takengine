import { core } from 'engine_core';
import { regl, stats } from 'engine_utils';

import { init_state } from 'game';

const mk_middleware = game_stats => (fn, state) => stats.wrap_fps(game_stats)(fn, state);

const main = () => {
    const game_stats = stats.create();
    const middleware = mk_middleware(game_stats);
    regl.exec(core.game_loop.bind(this, core.mk_game_state(init_state(regl.regl)), middleware));
};

main();
