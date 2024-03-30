import { createContext, useState } from 'react';
import { getRandomWord } from '../utils';

export const Context = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};
const HIDDEN_WORD = getRandomWord();

export const ContextProvider = ({ children }: Props) => {
    const [inputLetters, setInputLetters] = useState<{
        great: string[];
        wrong: string[];
    }>({
        great: [],
        wrong: [],
    });
    const [hiddenWord] = useState<string>(HIDDEN_WORD);

    console.log('ContextProvider', { hiddenWord, HIDDEN_WORD });

    return (
        <Context.Provider
            value={{
                inputLetters,
                setInputLetters,
                hiddenWord,
            }}
        >
            {children}
        </Context.Provider>
    );
};
