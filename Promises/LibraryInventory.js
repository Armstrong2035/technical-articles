const books = {
  item1: { title: "Steve Jobs", author: "Sir Isaac Walterson", stock: 4 },

  item2: {
    title:
      "Hard Drive: Bill Gates and the Making of the Microsoft Empireard drive",
    author: "James Wallace",
    stock: 5,
  },

  item3: { title: "Elon Musk", author: "Sir Isaac Walterson", stock: 1 },
};

// steveJobsBook = books.item1;
// billGatesBook = books.item2;
// elonMustBook = books.item3;
// console.log(elonMustBook.stock);

const search = (book) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderItems = order.items;
      let validOrder = orderItems.every((items) => {
        books[item[0]].stock >= item[1];
      });

      if (validOrder) {
        resolve(`${item[0]} is in sttock`);
      } else {
        reject(
          `${item[0]} is not in stock. But here are some other books from the same author`
        );
      }
    }, 1000);
  });
};

myOrder = ["Elon Musk", 1];

search(myOrder);
console.log(search(myOrder));
