import React from 'react';

type Props = {
    word: string;
};

const index = ({ word }: Props) => {
    console.log('RealWord', word);
    return (
        <div>
            <p>
                <small>{word.toUpperCase()}</small>
            </p>
        </div>
    );
};
const RealWord = React.memo(index);

export default RealWord;
