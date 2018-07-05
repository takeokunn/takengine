import Stats from 'stats.js';
import { autoDetectRenderer, Container, loader, Sprite } from 'pixi.js';

import { init_state } from './game';
import { game_loop, mk_game_state } from 'engine/core';

const wrap_fps_stats = stats => (fn, state) => {
    stats.begin();
    const next_state = fn(state);
    stats.end();
    return next_state;
};

const game_main = (game_renderer, game_stage, game_loader, game_stats) => {
    const icon = new Sprite(game_loader.resources["/img/icon.png"].texture);
    game_stage.addChild(icon);
    game_renderer.render(game_stage);
    // const middleware = (fn, state) => wrap_fps_stats(game_stats)(fn, state);
    // game_loop(mk_game_state(init_state(game_renderer, game_stage, game_loader)), middleware);
};

const exec = () => {
    // for renderer
    const node = document.getElementById('main');
    const renderer = new autoDetectRenderer();
    const stage = new Container();
    node.append(renderer.view);

    // for stats
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '8px';
    stats.domElement.style.left = '8px';
    node.append(stats.domElement);

    loader.add('/img/icon.png')
        .load(loader => game_main(renderer, stage, loader, stats));
};

exec();
