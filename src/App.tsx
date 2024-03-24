/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import HiddenWord from './components/HiddenWord';
import LettersTyped from './components/LettersTyped';
import RealWord from './components/RealWord';
import { ContextProvider } from './context';
import { getRandomWord } from './utils/index';

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
        <HiddenWord hiddenWord={hiddenWord} />
        <RealWord word={wordRef.current} />
        <LettersTyped />
     </div>
    </ContextProvider>
  )
}

export default App
