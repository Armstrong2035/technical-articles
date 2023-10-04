const books = {
  "Steve Jobs": {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    quantityInStock: 5,
    libraryPointsRequired: 2,
  },
  "Elon Musk": {
    title: "Elon Musk",
    author: "Walter Isaacson",
    quantityInStock: 1,
    libraryPointsRequired: 2,
  },
  "Hard Drive": {
    title: "Hard Drive",
    author: "James Wallace",
    quantityInStock: 3,
    libraryPointsRequired: 2,
  },
  "The Innovators": {
    title: "The Innovators",
    author: "Walter Isaacson",
    quantityInStock: 4,
    libraryPointsRequired: 2,
  },
  "Einstein: His Life and Universe": {
    title: "Einstein: His Life and Universe",
    author: "Walter Isaacson",
    quantityInStock: 2,
    libraryPointsRequired: 2,
  },
  "The Code Breaker": {
    title: "The Code Breaker",
    author: "Walter Isaacson",
    quantityInStock: 1,
    libraryPointsRequired: 2,
  },
  "The Martian": {
    title: "The Martian",
    author: "Andy Weir",
    quantityInStock: 5,
    libraryPointsRequired: 2,
  },

  Artemis: {
    title: "Artemis",
    author: "Andy Weir",
    quantityInStock: 2,
    libraryPointsRequired: 2,
  },
};

// Object holding a user profile

const user = {
  name: "Armstrong Olusoji",
  bookShelf: [],
};

const verifyOrder = (orderObject) => {
  return new Promise((resolve, reject) => {
    let book = null;
    const title = orderObject.title;
    const quantity = orderObject.quantity;
    if (books.hasOwnProperty(title)) {
      book = books[title];
    }
    if (book.quantityInStock >= quantity) {
      console.log(`${book.title} by ${book.author} is in stock`);
      resolve(book);
    } else {
      console.log(`${book.title} by ${book.author} is not in stock`);
      reject(book);
    }
  });
};

const checkOut = (book) => {
  return new Promise((resolve, reject) => {
    const requiredPoints = book.libraryPointsRequired;
    const title = book.title;
    const points = order.libraryPoints;

    if (requiredPoints <= points) {
      order.libraryPoints -= requiredPoints;
      console.log(
        `The transaction is successful, and your library card now has ${order.libraryPoints} points`
      );
      resolve(user.bookShelf.push(`${book.title} by ${book.author}`));
    } else {
      reject("You don't have enough points for this transaction");
    }
  });
};

const addToShelf = (book) => {
  return new Promise((resolve) => {
    // user.bookShelf.push(`${book.title} by ${book.author}`);
    resolve(user.bookShelf);
  });
};

const recommendBook = (book) => {
  return new Promise((resolve) => {
    const authorToMatch = book.author; // Use the author from the provided book
    const recommendedBooks = [];

    for (const title in books) {
      const bookItem = books[title];
      if (bookItem.author === authorToMatch && title !== book.title) {
        recommendedBooks.push(bookItem.title);
      }
    }
    console.log(
      `We don't have the book you wanted, but here are some other books from the same author: ${recommendedBooks}`
    );
    resolve(recommendedBooks);
  });
};

const order = {
  title: "The Innovators",
  quantity: 3,
  libraryPoints: 10,
};

verifyOrder(order)
  .then(checkOut)
  .then(addToShelf)
  .then((updatedBookShelf) => {
    console.log(
      `Your book has been added to the bookShelf: ${updatedBookShelf}`
    );
  })
  .catch(recommendBook);
