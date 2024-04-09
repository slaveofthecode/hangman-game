import React, { useContext } from 'react';
import { Context } from '../../context';

const LettersTyped = () => {
	const { inputLetters } = useContext(Context) as ContextType;

	return (
		<div className="max-w-[65%] mb-2 mt-6 h-9">
			{!!inputLetters.wrong.length && (
				<p className="text-gray-400 flex gap-1 flex-wrap">
					{inputLetters.wrong.map((letter: string, index: number) => {
						return (
							<span key={index} className="bg-[#0009] px-2 py-1 rounded-md">
								{letter.toUpperCase()}
							</span>
						);
					})}
				</p>
			)}
		</div>
	);
};

const MemoLettersTyped = React.memo(LettersTyped);

export default MemoLettersTyped;
