interface CommonState {
    error: string | null;
    loading: boolean;
    data: object;
}

export interface PlayState extends CommonState {
    data: {
        words: string[] | null;
        maximumAttempts: number;
        gameIsOver: boolean;
    };
}
