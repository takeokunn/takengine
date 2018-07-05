export const create = uid => {
    return {
        uid: uid,
        systems: [],
        components: [
            {
                uid: 'position',
            },
            {
                uid: 'text',
            },
        ]
    }
};
