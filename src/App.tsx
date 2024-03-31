/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import './App.css';
import ModalAddWords from './components/ModalAddWords';
import ForceShowKeyboard from './components/ForceShowKeyboard';
import HiddenWord from './components/HiddenWord';
import LettersTyped from './components/LettersTyped';
// import RealWord from './components/RealWord';
import Tools from './components/Tools';
import Message from './components/Message';
import { ContextProvider } from './context';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const lettersTyped = new Set<string>();

function App() {
    const eventWindowKeyUp = useRef<(evt: KeyboardEvent) => void>();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [letterTyped, setLetterTyped] = useState<string>();
    const [gameIsOver, setGameIsOver] = useState<boolean>(false);

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
        <ContextProvider>
            <div className="flex flex-col gap-3 justify-center items-center m-auto w-full">
                {isMobile && <ForceShowKeyboard />}
                <HiddenWord letterTyped={letterTyped} />
                <LettersTyped />
                {/* <RealWord /> */}
                <Message setGameIsOver={setGameIsOver} />
            </div>
            <Tools setShow={setShowModal} />
            {showModal && <ModalAddWords setShow={setShowModal} />}
        </ContextProvider>
    );
}

export default App;
