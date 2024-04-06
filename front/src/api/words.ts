const API_URL_WORDS =
    import.meta.env.VITE_API_URL_WORDS || 'http://localhost:3000/words';

export const getWordsAsync = async () => {
    console.log('API', API_URL_WORDS);
    const response = await fetch(API_URL_WORDS);
    const data = await response.json();
    return data;
};

export const postWordsAsync = async (word: string) => {
    const response = await fetch(API_URL_WORDS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    const data = await response.json();
    return data;
};
