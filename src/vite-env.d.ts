/// <reference types="vite/client" />

type ContextType = {
    inputLetters: {
        great: string[];
        wrong: string[];
    };
    setInputLetters: React.Dispatch<
        React.SetStateAction<{
            great: string[];
            wrong: string[];
        }>
    >;
    hiddenWord: string | undefined;
    setHiddenWord: React.Dispatch<React.SetStateAction<string | undefined>>;
};
