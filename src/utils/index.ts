// import { WORDS } from '../data';

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

// const getWord = (index: number) => {
//     const { words } = useSelector((state: RootState) => state.play);
//     // return WORDS[index];
//     return words[index];
// };

// const getWordsLength = () => {
//     const { words } = useSelector((state: RootState) => state.play);
//     return words.length;
// };

// export const getRandomWord = () => {
//     const index = getRandomInt(getWordsLength());
//     return getWord(index);
// };

export const allLettersAreInTheWord = (
    hiddenWord: string,
    inputLetters: string[],
): boolean => {
    return hiddenWord
        .split('')
        .every((letter) => inputLetters.includes(letter));
};
