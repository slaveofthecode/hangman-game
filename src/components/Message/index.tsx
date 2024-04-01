/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useContext } from 'react';
import { Context } from '../../context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { allLettersAreInTheWord } from '../../utils';

const Message = () => {
    const playStore = useSelector((state: RootState) => state.play);
    const {
        hiddenWord,
        inputLetters: { great, wrong },
    } = useContext(Context) as ContextType;

    const hiddenWordArray = hiddenWord?.split('');

    const handleClickTryAgain = (evt: FormEvent) => {
        evt.stopPropagation();
        evt.preventDefault();

        window.location.reload();
    };

    // console.log('Message', {
    //     hiddenWord,
    //     hiddenWordArray,
    //     great,
    //     wrong,
    // });

    if (hiddenWordArray && allLettersAreInTheWord(hiddenWord!, great)) {
        return (
            <div className="mt-6">
                <p>You are a winner!! 👏🏻👏🏻👏🏻</p>
                <small>
                    <button onClick={handleClickTryAgain}>Play again!</button>
                </small>
            </div>
        );
    } else if (wrong.length >= playStore.data.maximumAttempts) {
        return (
            <div>
                <p>You are a loser 😢😢😢</p>
                <p>The word was: {hiddenWord}</p>
                <small>
                    <button onClick={handleClickTryAgain}>Try again!</button>
                </small>
            </div>
        );
    }

    return null;
};

const MemoMessage = React.memo(Message);

export default MemoMessage;
