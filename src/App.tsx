/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import HideWord from './components/HideWord';
import LettersTyped from './components/LettersTyped';
import RealWord from './components/RealWord';
import { getRandomWord } from './utils/index';

const letters = new Set<string>();

function App() {

  const [ letterTyped, setLetterTyped ] = useState<string>();
  
  const wordRef = useRef(getRandomWord());

  useEffect(() => {

    const eventKeyUp = (evt: KeyboardEvent) => {

      const letterEntered = evt.key;
      
      if ( !letters.has(letterEntered) ) {
        letters.add(letterEntered);
        setLetterTyped(letterEntered);
      }

    };

    window.addEventListener('keyup', eventKeyUp);

    return () => {
      window.removeEventListener('keyup', eventKeyUp);
    }

  }, []);

  return (
    <>
     <div className='flex flex-col gap-3 justify-center items-center'> 
        <HideWord realWord={wordRef.current} letterTyped={letterTyped}/>
        <RealWord word={wordRef.current} />
        <LettersTyped letterTyped={[...letters].join('')} />
     </div>
    </>
  )
}

export default App
