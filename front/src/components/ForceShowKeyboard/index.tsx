/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react';

const index = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [inputRef]);

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    opacity: '1',
                    background: '#fff5',
                    pointerEvents: 'none',
                    outline: 'none',
                    zIndex: 100,
                }}
                autoFocus
                tabIndex={0}
            />
        </>
    );
};

export default index;
