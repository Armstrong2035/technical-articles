const books = [
  ["Steve Jobs", "Sir Isaac Walterson", 5],
  ["Elon Musk", "Sr Isaac Walterson", 1],
  ["Hard Drive", "James Wallace", 3],
];

const checkAvailabilty = (title, quantity) => {
  return new Promise((resolve, reject) => {
    let available;
    let author = "";

    for (book of books) {
      for (detail of book) {
        if (detail[0] === title && detail[2] >= quantity) {
          available = true;
          author = detail[1];
        }
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

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

checkAvailabilty("Elon Musk", 3).then(handleSuccess);
