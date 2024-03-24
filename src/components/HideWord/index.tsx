/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

type Props = {
    realWord: string;    
    letterTyped: string | undefined;
}

const index = ({ realWord, letterTyped }: Props) => {
    
        console.log('HideWord', {realWord, letterTyped})
        const [ hideWord, setHideWord ] = useState<string[]>([]);

         useEffect(()=>{
            if ( realWord.length > 0 ) {
                setHideWord(
                    new Array(realWord.length).fill('')
                )
            }
        },[realWord]);

        useEffect(() => {

            if (letterTyped) {
                const indexs = realWord.split('').map((letra, index) => {
                    if (letra === letterTyped) return index;
                }).filter((index) => index !== undefined);
    
                if (indexs) {
                    const cloneHideWord = hideWord! as string[];
                    indexs.forEach((index: number | undefined) => {
                        if (index !== undefined)
                            cloneHideWord[index] = letterTyped;
                        
                    });
    
                    setHideWord(cloneHideWord);
                }
            }
            
        },[letterTyped])


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
                    hideWord?.map((letter: string, index: number) => {
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

const HideWord = React.memo(index);

export default HideWord;
