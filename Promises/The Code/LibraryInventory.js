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
};

// Object holding a user profile

const user = {
  name: "Armstrong Olusoji",
  bookShelf: [],
};

// Object holding an order

const order = {
  title: "Steve Jobs",
  quantity: 5,
  libraryPoints: 10,
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
      reject(book); //potential problem area
    }
  });
};
// verifyOrder(order);

const checkOut = (book) => {
  return new Promise((resolve, reject) => {
    const requiredPoints = book.libraryPointsRequired;
    const title = book.title;
    const points = order.libraryPoints;

    if (requiredPoints <= points) {
      // Deduct points and update the user's libraryPoints
      order.libraryPoints -= requiredPoints;
      console.log(
        `The transaction is successful, and your library card now has ${order.libraryPoints} points`
      );
      resolve(user.bookShelf.push([`${book.title} by ${book.author}`]));
    } else {
      reject("You don't have enough points for this transaction");
    }
  });
};

// checkOut();

const addToShelf = (book) => {
  return new Promise((resolve) => {
    resolve(user.bookShelf.push(`${book.title} by ${book.author}`));
  });
};

const recommendBook = (orderObject) => {
  return new Promise((resolve) => {
    const orderedBook = verifyOrder(orderObject);
    const authorToMatch = orderedBook.author; // Author of the ordered book
    const recommendedBooks = [];

    for (const title in books) {
      const book = books[title];
      if (book.author === authorToMatch && title !== orderObject.title) {
        // Check if the author matches and the book is not the same as the ordered book
        recommendedBooks.push(book.title);
      }
    }

    resolve(recommendedBooks);
  });
};

verifyOrder(order)
  .then(checkOut)
  .then(addToShelf)
  .then((updatedBookShelf) => {
    console.log(
      `Your book has been added to the bookShelf ${updatedBookShelf}`
    );
  });

console.log(user.bookShelf);
