/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { Context } from "../../context";

const index = () => {

    const { hiddenWord2 } : {
        hiddenWord2: string[]
    } = useContext(Context);

    const anyEmpty = hiddenWord2?.every(i=>i);

    if (!anyEmpty) return null;

    return (
        <div>
            You are a winner!! 👏🏻👏🏻👏🏻
        </div>
    )
}

export default index