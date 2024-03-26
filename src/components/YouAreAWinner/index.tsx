/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { Context } from "../../context";

const index = () => {

    console.log('you are a winner was rendered');

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

const YouAreAWinner = React.memo(index);
export default YouAreAWinner
// export default index;

