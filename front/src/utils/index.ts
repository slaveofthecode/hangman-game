export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

export const validateIsWinner = (letters: string[], word: string) => {
    return word.split('').every((letter) => letters.includes(letter));
};

export const validateIsLoser = (letters: string[], maxAttempts: number) => {
    return letters.length >= maxAttempts;
};
