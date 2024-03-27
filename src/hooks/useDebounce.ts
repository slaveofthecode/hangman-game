import { useRef } from 'react';

const DEFAULT_TIME = 500;

const useDebounce = () => {
    const debounceRef = useRef<number>();
    const debounce = (cb: () => void, time = DEFAULT_TIME) => {
        debounceRef.current && clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            cb();
        }, time);
    };

    return { debounce };
};

export default useDebounce;
