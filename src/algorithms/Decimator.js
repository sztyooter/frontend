export const Decimator = (number, decimals) => {

    let n = 1;

    while (decimals) {

        n *= 10;
        decimals--;
    }

    return Math.round(number * n) / n;
};