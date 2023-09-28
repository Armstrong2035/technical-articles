const books = [
  ["Steve Jobs", "Sir Isaac Walterson", 5],
  ["Elon Musk", "Sr Isaac Walterson", 1],
  ["Hard Drive", "James Wallace", 3],
];

const checkAvailability = (title, quantity) => {
  return new Promise((resolve, reject) => {
    let available = false;
    let author = " ";

    for (const book of books) {
      if (book[0] === title && book[2] >= quantity) {
        available = true;
        author = book[1];
        break;
      } else if (book[0] === title) {
        author = book[1];
      }
    }

    if (available) {
      resolve(`${title} written by ${author} is available`);
    } else {
      reject(
        `${title} is unavailable. But here are some other books by ${author}`
      );
    }
  });
};

// const handleSuccess = (resolvedValue) => {
//   console.log(resolvedValue);
// };

// const handleFailure = (rejectedValue) => {
//   console.log(rejectedValue);
// };

// checkAvailability("Hard Drive", 5).then(handleSuccess, handleFailure);
