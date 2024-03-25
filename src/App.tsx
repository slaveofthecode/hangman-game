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

function App() {
  
  const wordRef = useRef(getRandomWord());
  
  const [ hiddenWord, setHiddenWord ] = useState<string[]>([]);

  useEffect(() => {
    if ( wordRef.current.length > 0 )
      setHiddenWord(wordRef.current.split(''));
    
  }, [wordRef.current]);
  
  return (
    <ContextProvider>
        <div className='flex flex-col gap-3 justify-center items-center'> 
            { isMobile && <ForceShowKeyboard /> }
            <HiddenWord hiddenWord={hiddenWord} />
            <RealWord word={wordRef.current} />
            <LettersTyped />
            <YouAreAWinner />
            <Tools />
            <AddWords />
        </div>
    </ContextProvider>
  )
}

export default App
