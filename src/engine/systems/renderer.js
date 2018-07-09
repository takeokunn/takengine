export const system = state => {
    const renderer = state.game.rendering_engine.renderer;
    const position = state.state.position;
    const entities = state.systems.render.hasOwnProperty('entities')? state.systems.render.entities : [];
    const render_entity = entities.map(entity => position[entity]);
    renderer(render_entity);
    return state;
};
