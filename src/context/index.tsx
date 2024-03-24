/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Context = createContext<any>(null);

type Props = {
	children: React.ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
	const [ hiddenWord2, setHiddenWord2 ] = useState<string|null>(null);
	const [ letterTyped2, setLetterTyped2 ] = useState<string>();
	const [ allLetterTyped, setAllLetterTyped ] = useState<string[]>([]);

	console.log('ContextProvider', 
	{ hiddenWord2, letterTyped2, allLetterTyped});

	useEffect(() => {
		if (letterTyped2)
			setAllLetterTyped((prev) => [...prev, letterTyped2]);		
		
	},[letterTyped2]);

	return (
		<Context.Provider value={{
			hiddenWord2, 
			setHiddenWord2, 
			letterTyped2, 
			setLetterTyped2,
			allLetterTyped,
			setAllLetterTyped
		}}>
			{children}
		</Context.Provider>
	);
};
