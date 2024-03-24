import React from "react";

type Props = {
    letterTyped: string;
}


const index = ({ letterTyped }: Props) => {  
    if (!letterTyped) return null;
    
    console.log('LettersTyped', letterTyped);
    
    return (
        <div>
            <p>
                {
                Array.from(letterTyped).map( (letter: string, index: number) => {
                    return (
                    <span key={index}>
                        {letter}
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