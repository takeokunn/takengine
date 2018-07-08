export const system = state => {
    const renderer = state.game.rendering_engine.renderer;
    const player1 = state.state.sprite.player1;
    renderer(player1)();
    return state;
};
