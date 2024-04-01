import { createContext, useState } from 'react';

export const Context = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
    const [inputLetters, setInputLetters] = useState<{
        great: string[];
        wrong: string[];
    }>({
        great: [],
        wrong: [],
    });
    const [hiddenWord, setHiddenWord] = useState<string>();

    // console.log('ContextProvider', { hiddenWord });

    return (
        <Context.Provider
            value={{
                inputLetters,
                setInputLetters,
                hiddenWord,
                setHiddenWord,
            }}
        >
            {children}
        </Context.Provider>
    );
};
