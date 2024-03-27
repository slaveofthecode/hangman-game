type Props = {
    setShow: (show: boolean) => void;
};

const index = ({ setShow }: Props) => {
    return (
        <div className="absolute bottom-0 left-0 w-screen p-2">
            <nav className="flex justify-end px-3">
                <a
                    className="text-gray-500 text-sm transition duration-500 ease-in-out hover:text-gray-100"
                    onClick={() => setShow(true)}
                >
                    add words
                </a>
            </nav>
        </div>
    );
};

export default index;
