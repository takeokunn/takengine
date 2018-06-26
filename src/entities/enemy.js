export const create = (uid) => {
    return {
        uid: uid,
        components: [
            {
                uid: 'position',
                state: state => state
            },
            {
                uid: 'text',
                state: state => state
            },
        ]
    }
};
