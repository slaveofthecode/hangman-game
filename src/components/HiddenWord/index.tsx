/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';

type Props = {
    letterTyped: string | undefined;
};

const HiddenWord = ({ letterTyped }: Props) => {
    console.log('HiddenWord Component', { letterTyped });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { hiddenWord, setInputLetters } = useContext<any>(Context);
    const [currentHiddenWord, setCurrentHiddenWord] = useState<string[]>([]);

    useEffect(() => {
        if (hiddenWord)
            setCurrentHiddenWord(hiddenWord.split('').map(() => ''));
    }, []);

    useEffect(() => {
        if (letterTyped) {
            letterTyped = letterTyped.toLowerCase();
            if (hiddenWord?.toString().split('').includes(letterTyped)) {
                setInputLetters(
                    (prev: { great: string[]; wrong: string[] }) => ({
                        ...prev,
                        great: [...prev.great, letterTyped],
                    }),
                );
            } else {
                setInputLetters(
                    (prev: { great: string[]; wrong: string[] }) => ({
                        ...prev,
                        wrong: [...prev.wrong, letterTyped],
                    }),
                );
            }

            const indexs = hiddenWord
                ?.toString()
                .split('')
                .map((letra: string, index: number) => {
                    if (letra === letterTyped) return index;
                    return -1;
                })
                .filter((index: number) => index !== -1);

            if (indexs) {
                const cloneCurrentHiddenWord = [...currentHiddenWord];
                indexs.forEach((index: number) => {
                    if (index !== -1)
                        cloneCurrentHiddenWord[index] =
                            letterTyped!.toUpperCase();
                });

                setCurrentHiddenWord(cloneCurrentHiddenWord);
            }
        }
    }, [letterTyped]);

    return (
        <div>
            {currentHiddenWord?.map((letter: string, index: number) => {
                return (
                    <span
                        key={`${letter}-${index}`}
                        id={`${letter}-${index}`}
                        className="p-2 mx-2 border-1 border-b-2 border-b-gray-200 text-4xl outline-none"
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    );
};

const MemoHiddenWord = React.memo(HiddenWord);

export default MemoHiddenWord;
