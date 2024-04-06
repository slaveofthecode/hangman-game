/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useContext } from 'react';
import { Context } from '../../context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AgainIcon from '../../assets/again.svg';
import { validateIsWinner } from '../../utils';

const Message = () => {
    const playStore = useSelector((state: RootState) => state.play);
    const {
        hiddenWord,
        inputLetters: { great, wrong },
    } = useContext(Context) as ContextType;

    const hiddenWordArray = hiddenWord?.split('');

    // console.log('Message', {
    //     hiddenWord,
    //     hiddenWordArray,
    //     great,
    //     wrong,
    // });

    if (hiddenWordArray && validateIsWinner(great, hiddenWord!)) {
        return (
            <ContentMessage>
                <p className="text-green-500">You are a winner!! 👏🏻👏🏻👏🏻</p>
            </ContentMessage>
        );
    } else if (wrong.length >= playStore.data.maximumAttempts) {
        return (
            <ContentMessage>
                <p className="text-red-500">You are a loser 😢😢😢</p>
                <p>
                    The word was:{' '}
                    <strong className="text-xl">
                        {hiddenWord?.toUpperCase()}
                    </strong>
                </p>
            </ContentMessage>
        );
    }

    return null;
};

const MemoMessage = React.memo(Message);

export default MemoMessage;

function ButtonAgain() {
    const onClick = (evt: FormEvent) => {
        evt.stopPropagation();
        evt.preventDefault();

        window.location.reload();
    };

    return (
        <button
            onClick={onClick}
            className="w-10 h-11 fill-slate-400 mt-4 text-slate-400"
        >
            <AgainIcon />
        </button>
    );
}

function ContentMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-lg">
            {children}
            <ButtonAgain />
        </div>
    );
}
