export const reducers = {
    setGameIsOver: (
        state: { data: { gameIsOver: boolean } },
        action: { payload: boolean },
    ) => {
        state.data.gameIsOver = action.payload;
    },
};
