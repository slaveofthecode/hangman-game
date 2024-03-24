/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useLayoutEffect, useRef } from 'react';

const index = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useLayoutEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);


    return (
        <>
            <input 
                ref={inputRef} 
                type="text" 
                style={{ 
                    position: 'absolute', 
                    left: '-100px' 
            }}
            autoFocus tabIndex={0} />
        </>
    );
};

export default index;
