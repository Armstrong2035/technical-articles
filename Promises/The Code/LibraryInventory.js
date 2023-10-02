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

// Rewrite all functions first without promises
// 1. Create a user object. /
// 2. Let book array deduct points
// 3. Check the availability of a book /
// 4. If book is available, check if user has enough points in library card. Chain this function with check availability
// 5. Everything checks out, deduct points from library carrd, and store book inside user.shelf
// 6. if Step 3 fails, suggest other books by the same author
// Mark the end of each function / bracket so it is easy to nest it insisde its corresponding promise

const verifyOrder = (orderObject) => {
  let book = null;
  const title = orderObject.title;
  const quantity = orderObject.quantity;
  if (books.hasOwnProperty(title)) {
    book = books[title];
  }
  if (book.quantityInStock >= quantity) {
    console.log(`${book.title} by ${book.author} is in stock`);
  } else {
    console.log(`${book.title} by ${book.author} is not in stock`);
  }
};
verifyOrder(order);

const checkOut = (orderObject) => {
  const title = orderObject.title;
  const points = orderObject.libraryPoints;

  if (books.hasOwnProperty(title)) {
    const book = books[title];
    if (book.libraryPointsRequired <= points) {
      // Deduct points and update the user's libraryPoints
      orderObject.libraryPoints -= book.libraryPointsRequired;
      return `The transaction is successful, and your library card now has ${orderObject.libraryPoints} points`;
    } else {
      return "You don't have enough points";
    }
  } else {
    return "The book is not available in the catalog";
  }
};

console.log(checkOut(order));
