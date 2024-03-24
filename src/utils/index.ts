import { WORDS } from "../data";

const getRandomInt = (max: number) => {
	return Math.floor(Math.random() * max);
};

const getWord = (index: number) => {
	return WORDS[index];
};

export const getRandomWord = () => {
	const index = getRandomInt(WORDS.length);
	return getWord(index);
};
