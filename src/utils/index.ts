export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

export const allLettersAreInTheWord = (
    word: string,
    letters: string[],
): boolean => {
    return word.split('').every((letter) => letters.includes(letter));
};
