const books = [
  ["Steve Jobs", "Sir Isaac Walterson", 5],
  ["Elon Musk", "Sr Isaac Walterson", 1],
  ["Hard Drive", "James Wallace", 3],
];

export const checkAvailability = (title, quantity) => {
  return new Promise((resolve, reject) => {
    const orderArr = [title, quantity];
    let available = false;
    let author = " ";

    for (const book of books) {
      if (book[0] === orderArr[0] && book[2] >= orderArr[1]) {
        available = true;
        author = book[1];
        break;
      } else if (book[0] === orderArr[0]) {
        author = book[1];
      }
    }

    if (available) {
      resolve(`${orderArr[0]} written by ${orderArr[1]} is available`);
    } else {
      reject(
        `${orderArr[0]} is unavailable. But here are some other books by ${orderArr[1]}`
      );
    }
  });
};

export default books;
