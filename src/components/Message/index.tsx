/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useContext } from 'react';
import { Context } from '../../context';

const MAXIMUM_ATTEMPTS = 6;

type Props = {
    setGameIsOver: (gameIsOver: boolean) => void;
};

const Message = ({ setGameIsOver }: Props) => {
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

    console.log('Message', {
        hiddenWord,
        hiddenWordArray,
        great,
        wrong,
    });

    if (hiddenWordArray && allLettersAreInTheWord(hiddenWord!, great)) {
        setGameIsOver(true);
        return (
            <div className="mt-6">
                <p>You are a winner!! 👏🏻👏🏻👏🏻</p>
                <small>
                    <button onClick={handleClickTryAgain}>Play again!</button>
                </small>
            </div>
        );
    } else if (wrong.length >= MAXIMUM_ATTEMPTS) {
        setGameIsOver(true);
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

function allLettersAreInTheWord(
    hiddenWord: string,
    inputLetters: string[],
): boolean {
    return hiddenWord
        .split('')
        .every((letter) => inputLetters.includes(letter));
}
