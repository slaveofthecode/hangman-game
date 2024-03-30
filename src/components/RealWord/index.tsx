import React, { useContext } from 'react';
import { Context } from '../../context';

const RealWord = () => {
    const { hiddenWord } = useContext(Context) as ContextType;

    console.log('RealWord', hiddenWord!);
    return (
        <div>
            <p>
                <small>{hiddenWord?.toUpperCase()}</small>
            </p>
        </div>
    );
};
const MemoRealWord = React.memo(RealWord);

export default MemoRealWord;
