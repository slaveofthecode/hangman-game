/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from 'react';
import { Context } from '../../context';

const letters = new Set<string>();

type Props = {
    hiddenWord: string[];
}

const index = ({ hiddenWord }: Props) => {

    
        if ( !hiddenWord.length) return null;
    
        const { 
            hiddenWord2, 
            setHiddenWord2, 
            letterTyped2,
            setLetterTyped2 
        } = useContext(Context);

        console.log('HiddenWord', {hiddenWord})
        // const [ hideWord, setHideWord ] = useState<string[]>([]);

        
        useEffect(() => {

            const eventKeyUp = (evt: KeyboardEvent) => {
        
                const letterEntered = evt.key;
                
                if ( !letters.has(letterEntered) ) {
                     letters.add(letterEntered);
                    //  setLetterTyped(letterEntered);
                     setLetterTyped2(letterEntered);
                }
        
            };
        
            window.addEventListener('keyup', eventKeyUp);
        
            return () => {
              window.removeEventListener('keyup', eventKeyUp);
            }
        
          }, []);

          useEffect(() => {

            if (letterTyped2) {
                const indexs = hiddenWord.map((letra:string, index:number) => {
                    if (letra === letterTyped2) return index;
                    return -1;
                }).filter((index) => index !== -1);
    
                console.log('indexs', indexs);
                if (indexs) {
                    const cloneHideWord = hiddenWord2! as string[];
                    indexs.forEach((index: number) => {
                        if (index !== -1)
                            cloneHideWord[index] = letterTyped2;
                        
                    });
    
                    setHiddenWord2(cloneHideWord);
                }
            
            }
    
        }, [letterTyped2])

        useEffect(()=>{
            if ( hiddenWord.length > 0 )
                setHiddenWord2(
                    new Array(hiddenWord.length).fill('')
                )
            
        },[hiddenWord]);

        // useEffect(() => {

        //     if (letterTyped) {
        //         const indexs = realWord.split('').map((letra, index) => {
        //             if (letra === letterTyped) return index;
        //         }).filter((index) => index !== undefined);
    
        //         if (indexs) {
        //             const cloneHideWord = hideWord! as string[];
        //             indexs.forEach((index: number | undefined) => {
        //                 if (index !== undefined)
        //                     cloneHideWord[index] = letterTyped;
                        
        //             });
    
        //             setHideWord(cloneHideWord);
        //         }
        //     }
            
        // },[letterTyped])


        // useEffect(() => {
        //     if (letterTyped) {
        //         const indexs = realWord.split('').map((letra, index) => {
        //             if (letra === letterTyped) return index;
        //             return undefined; // Debes devolver algo en todos los casos
        //         }).filter((index) => index !== undefined) as number[];
        
        //         if (indexs.length > 0) {
        //             const updatedHideWord = hideWord as string[]; // Clonar el estado anterior
        //             indexs.forEach((index: number) => {
        //                 updatedHideWord[index] = letterTyped;
        //             });
        //             setHideWord(updatedHideWord);
        //         }
        //     }
        // }, [letterTyped, realWord, hideWord]);

        return (
            <div>
                {
                    hiddenWord2?.map((letter: string, index: number) => {
                        return (
                            <span
                                key={`${letter}-${index}`}
                                id={`${letter}-${index}`}
                                className='p-2 mx-2 border-1 border-b-2 border-b-gray-200 text-4xl outline-none'
                            >{letter}</span>
                        );
                    })
                }
            </div>
        );
}

const HiddenWord = React.memo(index);
export default HiddenWord;
