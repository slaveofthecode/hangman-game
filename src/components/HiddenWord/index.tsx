/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from 'react';
import { Context } from '../../context';

const letters = new Set<string>();

type Props = {
    hiddenWord: string[];
}

const index = ({ hiddenWord }: Props) => {

        console.log('HiddenWord', {hiddenWord})
    
        const { 
            hiddenWord2, 
            setHiddenWord2, 
            letterTyped2,
            setLetterTyped2 
        } = useContext(Context);


        
        useEffect(() => {

            const eventKeyUp = (evt: KeyboardEvent) => {
        
                const letterEntered = evt.key;
                
                if ( !letters.has(letterEntered) ) {
                     letters.add(letterEntered);
                     setLetterTyped2(letterEntered);
                }
        
            };
        
            window.addEventListener('keyup', eventKeyUp);
        
            return () => {
              window.removeEventListener('keyup', eventKeyUp);
            }
        
          }, []);

          useEffect(() => {

            if (letterTyped2 as string) {
                const indexs = hiddenWord.map((letra:string, index:number) => {
                    if (letra === letterTyped2) return index;
                    return -1;
                }).filter((index) => index !== -1);
                    
                if (indexs) {
                    const cloneHiddenWord = hiddenWord2! as string[];
                    indexs.forEach((index: number) => {
                        if (index !== -1)
                            cloneHiddenWord[index] = letterTyped2.toUpperCase();
                        
                    });
    
                    setHiddenWord2(cloneHiddenWord);
                }
            
            }
    
        }, [letterTyped2])

        useEffect(()=>{
            if ( hiddenWord.length > 0 )
                setHiddenWord2(
                    new Array(hiddenWord.length).fill('')
                )
            
        },[hiddenWord]);

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
