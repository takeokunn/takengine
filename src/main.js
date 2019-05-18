import { core } from 'engine_core';
import { pixi, stats } from 'engine_utils';

import { mk_stages, mk_init_state } from 'game';
import manifest from './manifest.json';

const WINDOW_WIDTH = 512;
const WINDOW_HEIGHT = 512;
const WINDOW_BACKGROUND = 0x1099bb;

const mk_middleware = game_stats => (fn, state) => stats.wrap_fps(game_stats)(fn, state);

const main = (loader, resources) => {
    const game_stats = stats.create();
    const middleware = mk_middleware(game_stats);
    const renderer = pixi.initialize_renderer(WINDOW_WIDTH, WINDOW_HEIGHT, WINDOW_BACKGROUND);
    const stages = mk_stages();
    const init_state = mk_init_state(loader, resources, renderer, stages);
    requestAnimationFrame(core.game_loop.bind(this, core.mk_game_state(init_state), middleware));
};

pixi.loader(manifest, main);
