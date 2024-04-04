/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent, useState, useEffect, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { postWords } from '../../store/features/play/thunk';

type Props = {
    setShow: (show: boolean) => void;
};

const ModalAddWords = ({ setShow }: Props) => {
    const dispatch = useDispatch();
    const { words } = useSelector((store: RootState) => store.play.data);

    const inputRef = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<string[]>([]);
    const [newWord, setNewWord] = useState<string>('');

    useEffect(() => {
        words && setData(words);
    }, []);

    const closeModal = (evt: FormEvent) => {
        evt.preventDefault();
        // evt.stopPropagation();

        setShow(false);
        // if (evt.key === 'Escape') setShow(false); // evt: KeyboardEvent
    };

    const { debounce } = useDebounce();
    const handlerOnChange = (evt: FormEvent<HTMLInputElement>) => {
        debounce(() => {
            const { value } = evt.target as HTMLInputElement;

            const dataFiltered = [...words!].filter((d) => {
                if (d.includes(value)) return d;
            });

            setNewWord(value);
            setData(dataFiltered);
        }, 100);
    };

    const handleOnClick = (evt: FormEvent) => {
        evt.preventDefault();

        if (!words?.includes(newWord)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(postWords(newWord) as any);

            const wordsSorted = [...words!, newWord]?.sort(
                (a: string, b: string) => a.localeCompare(b),
            );
            setData(wordsSorted);

            setNewWord('');
        }

        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = '';
        }
    };

    return (
        <section className="absolute top-0 left-0 w-full h-full flex z-10 bg-[#0008]">
            <div className="w-11/12 h-4/6 bg-[#000b] m-auto z-20 flex flex-col justify-center items-stretch">
                <header className="p-4 flex justify-between items-center">
                    <span>Add new words</span>
                    <a
                        className="text-gray-600 hover:text-gray-300 transition-all ease-in-out duration-300 cursor-pointer"
                        onClick={closeModal}
                    >
                        X
                    </a>
                </header>

                <main className="flex flex-col gap-2 flex-auto overflow-hidden">
                    <form className="flex m-2" onSubmit={handleOnClick}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="p-2 flex-1 outline-none"
                            placeholder="Type a word to add..."
                            onChange={handlerOnChange}
                        />
                        <button
                            className="px-5 bg-[#fff1]"
                            onClick={handleOnClick}
                            disabled={newWord.length === 0}
                        >
                            +
                        </button>
                    </form>
                    <div className="flex flex-wrap gap-2 px-2">
                        {data?.map((word, index) => {
                            return (
                                <p
                                    key={index}
                                    className="bg-slate-800 p-2 rounded-md"
                                >
                                    {word}
                                </p>
                            );
                        })}
                    </div>
                </main>

                <footer className="bottom-0 left-0 w-full h10 bg-[#fff1] p-2">
                    <div className="flex justify-end opacity-75">
                        <small>
                            ( <strong>{words?.length}</strong> )
                        </small>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default ModalAddWords;
