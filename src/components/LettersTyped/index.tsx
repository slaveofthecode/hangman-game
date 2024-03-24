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
            <p>
                {
                Array.from(allLetterTyped).map( (letter: string, index: number) => {
                    return (
                    <span key={index}>
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