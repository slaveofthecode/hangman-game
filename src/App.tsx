/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import AddWords from './components/AddWords';
import ForceShowKeyboard from './components/ForceShowKeyboard';
import HiddenWord from './components/HiddenWord';
import LettersTyped from './components/LettersTyped';
import RealWord from './components/RealWord';
import Tools from './components/Tools';
import YouAreAWinner from './components/YouAreAWinner';
import { ContextProvider } from './context';
import { getRandomWord } from './utils/index';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const letters = new Set<string>();

function App() {
  
  const wordRef = useRef(getRandomWord());
  const eventWindowKeyUp = useRef<(evt:KeyboardEvent)=>void>();
  
  const [ hiddenWord, setHiddenWord ] = useState<string[]>([]);
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ letterTyped, setLetterTyped ] = useState<string>();

  useEffect(() => {
    if ( wordRef.current.length > 0 )
      setHiddenWord(wordRef.current.split(''));
    
  }, [wordRef.current]);

  useEffect( () => {

    eventWindowKeyUp.current = (evt: KeyboardEvent) => {
      console.log('Key pressed:', evt.key);
      const letterEntered = evt.key;
        
        if ( !letters.has(letterEntered) ) {
            letters.add(letterEntered);
            // setLetterTyped2(letterEntered);
            setLetterTyped(letterEntered);
        }
    }

    console.log('showModal', showModal);
    if (showModal === false) 
      window.addEventListener('keyup', eventWindowKeyUp.current);
    

    return () => {
      if (!showModal && eventWindowKeyUp.current) {
        window.removeEventListener('keyup', eventWindowKeyUp.current);
      }
    };

  },[showModal])  

  return (
    <ContextProvider>
        <div className='flex flex-col gap-3 justify-center items-center m-auto w-full'> 
            { isMobile && <ForceShowKeyboard /> }
            <HiddenWord hiddenWord={hiddenWord} letterTyped={letterTyped} />
            <RealWord word={wordRef.current} />
            <LettersTyped />
            <YouAreAWinner />
            <Tools setShow={setShowModal} />
            <AddWords show={showModal} setShow={setShowModal} />
        </div>
    </ContextProvider>
  )
}

export default App
