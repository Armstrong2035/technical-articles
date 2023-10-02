const orderArr = [];

const checkAvailability = (order) => {
  return new Promise((resolve, reject) => {
    let availableBook = null;

    for (const book of books) {
      if (book[0] === order[0] && book[2] >= order[1]) {
        availableBook = book;
        break;
      }
    }

    if (availableBook) {
      const [title, author] = availableBook;
      orderArr.push(`${title} by ${author}`);
      resolve(`${title} by ${author} is available. Adding it to your cart ...`);
    } else {
      // If book is unavailable, suggest other books by the same author
      const authorBooks = books.filter((book) => book[1] === order[0]);
      if (authorBooks.length > 0) {
        const suggestedBooks = authorBooks.map((book) => book[0]);
        reject(
          `${order[0]} is unavailable. Here are some other books by ${
            order[0]
          }: ${suggestedBooks.join(", ")}`
        );
      } else {
        reject(`${order[0]} is unavailable.`);
      }
    }
  });
};

const checkLibraryCardPoints = () => {
  return new Promise((resolve, reject) => {
    if (libraryCardPoints >= 1) {
      resolve("Library card has enough points for checkout.");
    } else {
      reject("Insufficient points on the library card.");
    }
  });
};

const addToBookShelf = (book) => {
  return new Promise((resolve, reject) => {
    if (book) {
      myBookShelf.push(book); // Add the book to the bookshelf
      resolve(`Added book to your bookshelf: ${book}`);
    } else {
      reject("No book to add to the bookshelf.");
    }
  });
};

const handleSuccess = (resolvedValue) => {
  const handleSuccess = (resolvedValue) => {
    console.log(resolvedValue);
  };
};

const handleFailure = (rejectedValue) => {
  console.log(rejectedValue);
};

const order = ["Einstein: His Life and Universe", 1];

checkAvailability(order) // Check book availability first
  .then((resolvedValue) => {
    console.log(resolvedValue); // Log resolved value
    return checkLibraryCardPoints();
  }) // Chain with library card points check
  .then((resolvedValue) => {
    console.log(resolvedValue); // Log resolved value
    return addToBookShelf(orderArr[0]);
  }) // Chain with adding to bookshelf
  .then(handleSuccess) // If all promises succeed, handle success
  .catch((rejectedValue) => {
    console.log(rejectedValue); // Log rejected value
    handleFailure(rejectedValue);
  }); // Handle any failures

console.log(myBookShelf); // Now this should contain the ordered book if it was available.
