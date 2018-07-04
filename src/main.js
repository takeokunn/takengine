import { autoDetectRenderer, Container } from 'pixi.js';

import { init_state } from './game';
import { game_loop, mk_game_state } from 'engine/core';

const element = document.getElementById('main');

const renderer = new autoDetectRenderer();
const stage = new Container();

const main = () => game_loop(mk_game_state(init_state(renderer, stage)));

main();
