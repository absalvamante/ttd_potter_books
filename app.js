
const BOOK_PRICE = 8;
const discounts = [{discount: .25, bookpcs: 5}, {discount: .2, bookpcs: 4}, {discount: .1, bookpcs: 3},{discount: .05, bookpcs: 2}]

//Input: Array of numbers that pertains number of books.
function calculatePrice(booksToComputeTotal){      
    var lowestNetTotal = undefined;    
    for(var i = 0;i<discounts.length;i++){
      var booksCopy = [...booksToComputeTotal];
      var total=0;

      //Loop through all the discounts
      for(var j=i;j<discounts.length;){
        let matchedCount=0;

        //Copy array that will be modified in the next loop
        let tempArr = [...booksCopy];

        //Loop through the array and decrement the book count.
        //Do this untill pricing model matched or it reaches the last index of the array
        for(let y=0;y<tempArr.length && matchedCount < discounts[j].bookpcs;y++){
          //If element is greater than zero, decrement the count, otherwise continue with the loop
          if(!isNaN(tempArr[y]) && tempArr[y] > 0){
            tempArr[y] -= 1;
            matchedCount++;
          }
        }
        
        if(matchedCount == discounts[j].bookpcs){
          //If matched found try again using the same discount/do not increment index
          booksCopy = tempArr;
          total += (BOOK_PRICE * matchedCount) * (1 - discounts[j].discount);
        }
        else{
          //Move to next discount if no match found
          j++;
        }
      }

      //Get the sum of the remaining books in the array and multiple by the book price
      //These books are considered not falling into the pricing model
      total +=  booksCopy.reduce((acc, cur) => acc + cur, 0) * BOOK_PRICE;
      if(!lowestNetTotal || lowestNetTotal > total)
        lowestNetTotal = total;        
    }

    return lowestNetTotal;
  }


  module.exports = calculatePrice;