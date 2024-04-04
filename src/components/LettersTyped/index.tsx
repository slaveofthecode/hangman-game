import React, { useContext } from 'react';
import { Context } from '../../context';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { allLettersAreInTheWord } from '../../utils';
import { setGameIsOver } from '../../store/features/play/slice';
import { RootState } from '../../store';

const LettersTyped = () => {
    const playStore = useSelector((state: RootState) => state.play);
    const dispatch = useDispatch();

    const { inputLetters, hiddenWord } = useContext(Context) as ContextType;

    if (!inputLetters.wrong.length) return null;

    if (
        hiddenWord?.split('') &&
        allLettersAreInTheWord(hiddenWord!, inputLetters.great)
    ) {
        dispatch(setGameIsOver(true));
    } else if (inputLetters.wrong.length >= playStore.data.maximumAttempts) {
        dispatch(setGameIsOver(true));
    }

    // console.log('LettersTyped', inputLetters.wrong.join(''));

    return (
        <div className="max-w-[65%] mb-2 mt-6">
            <p className="text-gray-400 flex gap-1 flex-wrap">
                {inputLetters.wrong.map((letter: string, index: number) => {
                    return (
                        <span
                            key={index}
                            className="bg-[#0009] px-2 py-1 rounded-md"
                        >
                            {letter.toUpperCase()}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

const MemoLettersTyped = React.memo(LettersTyped);

export default MemoLettersTyped;
