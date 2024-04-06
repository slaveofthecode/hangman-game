/// <reference types="vite/client" />

type ContextInputLettersType = {
    great: string[];
    wrong: string[];
};

type ContextHiddenWordType = string | undefined;

type ContextType = {
    inputLetters: ContextInputLettersType;
    setInputLetters: React.Dispatch<
        React.SetStateAction<ContextInputLettersType>
    >;
    hiddenWord: ContextHiddenWordType;
    setHiddenWord: React.Dispatch<React.SetStateAction<ContextHiddenWordType>>;
};
