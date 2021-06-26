const { expect } = require('@jest/globals');
const calculatePrice = require('./app');
const BOOK_PRICE = 8;

describe('calculatePrice', () => {
    test("Calculate the price of any conceivable shopping basket, giving as big a discount as possible", () => {

        //Test Basic Cases/One each book
        expect(calculatePrice([])).toBe(0);
        //1 copy of first book
        expect(calculatePrice([1])).toBe(BOOK_PRICE);
        //1 copy of second book
        expect(calculatePrice([0,1])).toBe(BOOK_PRICE);
        //1 copy of third book
        expect(calculatePrice([0,0,1])).toBe(BOOK_PRICE);
        //1 copy of fourth book
        expect(calculatePrice([0,0,0,1])).toBe(BOOK_PRICE);
        //1 copy of fifth book
        expect(calculatePrice([0,0,0,0,1])).toBe(BOOK_PRICE);

        //Test Discounts
        //2 different books
        expect(calculatePrice([1, 1])).toBe(BOOK_PRICE * 2 * 0.95);
        //3 different books
        expect(calculatePrice([1, 1, 1])).toBe(BOOK_PRICE * 3 * 0.90);
        //4 different books
        expect(calculatePrice([1, 1, 1, 1])).toBe(BOOK_PRICE * 4 * 0.80);
        //All  different books
        expect(calculatePrice([1, 1, 1, 1, 1])).toBe(BOOK_PRICE * 5 * 0.75);

        //Test Combination of Discounted and Normal Price
        //2 copies of first book, 1 copy of second book
        expect(calculatePrice([2, 1])).toBe((BOOK_PRICE * 2 * 0.95) + (1 * BOOK_PRICE ));
        //2 copies of first and second book, 1 copy of third book
        expect(calculatePrice([2, 2, 1])).toBe((BOOK_PRICE * 3 * 0.90) + (BOOK_PRICE * 2 * .95));
        //2 copies of first, second and third book
        expect(calculatePrice([2, 2, 2])).toBe((BOOK_PRICE * 3 * 0.90) * 2);
        //2 copies of first book, and 1 copy for each remaining book
        expect(calculatePrice([2, 1, 1, 1, 1])).toBe((BOOK_PRICE * 5 * .75) + (1 * BOOK_PRICE));

        //Test Edge Cases
        //5 copies of first, second, third, and fifth book, 4 copies of fourth book
        expect(calculatePrice([5, 5, 5, 4, 5])).toBe(((BOOK_PRICE * 5 * .75) * 4) + (BOOK_PRICE * 4 * .8));
    })
})