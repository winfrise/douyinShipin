export const arrayShuffle = (arr) => {
    const result = arr.slice()
    for (let i = 0; i < result.length; ++i) {
        const j = Math.floor(Math.random() * (result.length - i)) + i;
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }
    return result;
}