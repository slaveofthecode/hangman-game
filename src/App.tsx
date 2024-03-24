/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import HiddenWord from './components/HiddenWord';
import LettersTyped from './components/LettersTyped';
import RealWord from './components/RealWord';
import { ContextProvider } from './context';
import { getRandomWord } from './utils/index';

// const letters = new Set<string>();

function App() {

  // const [ letterTyped, setLetterTyped ] = useState<string>();
  
  const wordRef = useRef(getRandomWord());

  const [ hiddenWord, setHiddenWord ] = useState<string[]>([]);

  useEffect(() => {
    if ( wordRef.current.length > 0 )
      setHiddenWord(wordRef.current.split(''));
    
  }, [wordRef.current]);

  // useEffect(() => {

  //   const eventKeyUp = (evt: KeyboardEvent) => {

  //     const letterEntered = evt.key;
      
  //     if ( !letters.has(letterEntered) ) {
  //       letters.add(letterEntered);
  //       setLetterTyped(letterEntered);
  //     }

  //   };

  //   window.addEventListener('keyup', eventKeyUp);

  //   return () => {
  //     window.removeEventListener('keyup', eventKeyUp);
  //   }

  // }, []);

  return (
    <ContextProvider>
     <div className='flex flex-col gap-3 justify-center items-center'> 
        {/* <HideWord realWord={wordRef.current} letterTyped={letterTyped}/> */}
        <HiddenWord hiddenWord={hiddenWord} />

        <RealWord word={wordRef.current} />
        {/* <LettersTyped letterTyped={[...letters].join('')} /> */}
        <LettersTyped />
     </div>
    </ContextProvider>
  )
}

export default App
