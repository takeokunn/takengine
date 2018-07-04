export const emit_events = (state, events) => {
    return state;
};

export const get_subscribed_events = (queue, entity_id, selectors_coll) => {
    const cb = (accum, sel) => {
        const queue_selector = queue.hasOwnProperty(sel)? queue[sel] : {};
        const queue_selector_events = queue_selector.hasOwnProperty(entity_id)? queue_selector[entity_id] : [];
        return queue_selector_events.reduce((acc, evt) => acc.concat(evt), accum);
    };
    return selectors_coll.reduce(cb, []);
};
