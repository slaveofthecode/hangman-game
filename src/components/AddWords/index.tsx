/* eslint-disable react-hooks/rules-of-hooks */

import { FormEvent, useEffect, useState } from "react";
import { WORDS } from '../../data';
import useDebounce from "../../hooks/useDebounce";

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
}

const AddWords = ({ show, setShow}: Props) => {

    if (!show) return null;

    const [ data, setData ] = useState<string[]>([]);
    const [ newWord, setNewWord ] = useState<string>();

    useEffect(()=>{
        setData(WORDS);
    },[])

    const closeModal = (evt: FormEvent) => {
        evt.preventDefault();
        evt.stopPropagation();

        setShow(false);
        // if (evt.key === 'Escape') setShow(false); // evt: KeyboardEvent
    }

    const { debounce } = useDebounce();
    const handlerOnChange = (evt: FormEvent<HTMLInputElement>) => {

        debounce( () => {
            const { value } = evt.target as HTMLInputElement;

            const dataFiltered = [...WORDS].filter( (d) => {
                if ( d.includes(value))
                    return d;
            });
            setNewWord(value);
            setData(dataFiltered);
        },100);

    }

    const handleOnClick = (evt:FormEvent) => {        
        evt.preventDefault();

        console.log('A', newWord);
    }

    return (
        <section className="absolute top-0 left-0 w-full h-full flex z-10 bg-[#0008]">
            <div className="w-11/12 h-4/6 bg-[#000b] m-auto z-20 relative">
                
                <header className="p-4 flex justify-between items-center">
                    <span>
                        Add new words
                    </span>
                    <a 
                        className="text-gray-600 hover:text-gray-300 transition-all ease-in-out duration-300 cursor-pointer"
                        onClick={closeModal}
                    >
                        X
                    </a>
                </header>
                
                <main className="flex flex-col gap-2">
                    <form className="flex m-2" onSubmit={handleOnClick}>
                        <input 
                            type="text" 
                            className="p-2 flex-1 outline-none" 
                            placeholder="Type a word to add..." 
                            onChange={handlerOnChange}
                        />
                        <button 
                            className="px-5 bg-[#fff1]"
                            onClick={handleOnClick}
                            disabled={!!data.length}
                        >+</button>
                    </form>
                    <div>
                        {
                            data.map( (word, index) => {
                                return (
                                    <p key={index}>{word}</p>
                                )
                            })
                        }
                    </div>
                </main>
                
                <footer className="absolute bottom-0 left-0 w-full h10 bg-[#fff1] p-2">
                    <div className="flex justify-end opacity-75">
                        <small>
                        ( <strong>{ data.length}</strong> )
                        </small>
                    </div>
                </footer>

            </div>
        </section>
    )
}

export default AddWords