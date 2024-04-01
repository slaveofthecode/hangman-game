type Props = {
    children: React.ReactNode;
};

const Tools = ({ children }: Props) => {
    return (
        <div className="absolute bottom-0 left-0 w-screen p-2">
            <nav className="flex justify-between px-3">{children}</nav>
        </div>
    );
};

export default Tools;
