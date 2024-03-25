/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { Context } from "../../context";

const index = () => {  

    const { allLetterTyped } : {
        allLetterTyped: string[];    
    } = useContext(Context);

    if (!allLetterTyped.length) return null;
    
    console.log('LettersTyped', allLetterTyped);
    
    return (
        <div>
            <p className="text-gray-400 flex gap-1">
                {
                Array.from(allLetterTyped).map( (letter: string, index: number) => {
                    return (
                    <span 
                        key={index}
                        className="bg-[#0009] px-2 py-1 rounded-md"
                    >
                        {letter.toUpperCase()}
                    </span>
                    );
                })
                }
            </p>
        </div>
    );
}

const LettersTyped = React.memo(index);

export default LettersTyped