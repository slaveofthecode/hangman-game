/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useContext } from 'react';
import './App.css';
import ModalAddWords from './components/ModalAddWords';
import ForceShowKeyboard from './components/ForceShowKeyboard';
import HiddenWord from './components/HiddenWord';
import LettersTyped from './components/LettersTyped';
import Tools from './components/Tools';
import Message from './components/Message';
import { Context } from './context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { getWords } from './store/features/playSlice';
import { getRandomInt } from './utils';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const lettersTyped = new Set<string>();

function App() {
    const dispatch = useDispatch();
    const playStore = useSelector((state: RootState) => state.play);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setHiddenWord } = useContext<any>(Context);

    const eventWindowKeyUp = useRef<(evt: KeyboardEvent) => void>();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [letterTyped, setLetterTyped] = useState<string>();
    const [gameIsOver, setGameIsOver] = useState<boolean>(false);

    useEffect(() => {
        if (playStore.data.words === null && playStore.error === null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(getWords() as any);
        }
    }, []);

    useEffect(() => {
        if (playStore.data.words?.length) {
            const maxWords = playStore.data.words.length;
            const indexWord = getRandomInt(maxWords);
            setHiddenWord(playStore.data.words[indexWord]);
        }
    }, [playStore.data.words]);

    useEffect(() => {
        eventWindowKeyUp.current = (evt: KeyboardEvent) => {
            const letterEntered = evt.key;

            if (!lettersTyped.has(letterEntered)) {
                lettersTyped.add(letterEntered);
                setLetterTyped(letterEntered);
            }
        };

        if (showModal === false) {
            window.addEventListener('keyup', eventWindowKeyUp.current);
        }

        return () => {
            if (!showModal && eventWindowKeyUp.current)
                window.removeEventListener('keyup', eventWindowKeyUp.current);
        };
    }, [showModal]);

    useEffect(() => {
        if (gameIsOver && eventWindowKeyUp.current) {
            window.removeEventListener('keyup', eventWindowKeyUp.current);
        }
    }, [gameIsOver]);

    return (
        <>
            <div className="flex flex-col gap-3 justify-center items-center m-auto w-full">
                {isMobile && <ForceShowKeyboard />}
                <HiddenWord letterTyped={letterTyped} />
                <LettersTyped />
                {/* <RealWord /> */}
                <Message setGameIsOver={setGameIsOver} />
            </div>
            <Tools setShow={setShowModal} />
            {showModal && <ModalAddWords setShow={setShowModal} />}
        </>
    );
}

export default App;
