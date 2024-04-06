import { createContext, useState } from 'react';

export const Context = createContext<ContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
    const [inputLetters, setInputLetters] = useState<ContextInputLettersType>({
        great: [],
        wrong: [],
    });
    const [hiddenWord, setHiddenWord] = useState<ContextHiddenWordType>();

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
