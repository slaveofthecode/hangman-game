/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ForceShowKeyboard from './components/ForceShowKeyboard';
import HiddenWord from './components/HiddenWord';
import LettersTyped from './components/LettersTyped';
import RealWord from './components/RealWord';
import { ContextProvider } from './context';
import { getRandomWord } from './utils/index';

function App() {

  // const hiddenWordRef = useRef<HTMLInputElement>(null);
  const wordRef = useRef(getRandomWord());

  const [ hiddenWord, setHiddenWord ] = useState<string[]>([]);

  useEffect(() => {
    if ( wordRef.current.length > 0 )
      setHiddenWord(wordRef.current.split(''));
    
  }, [wordRef.current]);

//   useEffect(() => {
//     if (hiddenWordRef.current) {
//         hiddenWordRef.current.focus();
//     }
// }, [hiddenWordRef.current]); // Focusing after the initial render
  
  return (
    <ContextProvider>
     <div className='flex flex-col gap-3 justify-center items-center'> 
        <ForceShowKeyboard />
        <HiddenWord hiddenWord={hiddenWord} />
        <RealWord word={wordRef.current} />
        <LettersTyped />
     </div>
    </ContextProvider>
  )
}

export default App
