import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRandomInt } from '../utils';
import { RootState } from '../store';

export const Context = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};
// const HIDDEN_WORD = getRandomWord();

export const ContextProvider = ({ children }: Props) => {
    const { words } = useSelector((state: RootState) => state.play);

    const [inputLetters, setInputLetters] = useState<{
        great: string[];
        wrong: string[];
    }>({
        great: [],
        wrong: [],
    });
    const [hiddenWord, setHiddenWord] = useState<string>();

    useEffect(() => {
        if (words) {
            setHiddenWord(words[getRandomInt(words.length)]);
        }
    }, [words]);

    console.log('ContextProvider', { hiddenWord, words });

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
