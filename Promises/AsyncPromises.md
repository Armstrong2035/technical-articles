## Introduction

Modern web development requires _asynchronicity_. Sometimes, a function needs to run only if a prior function is successful. At other times, multiple tasks within an application must occur simultaneously. These kinds of functions are called asynchronous operations.

Programming languages such as Java and the C family are **multi-threaded**. This means that they capable of handling asynchronous (async) operations naturally. JavaScript on the otherhand is a **single-threaded** language. Special functions are therefore needed to manage asynchronous operations in JavaScript. Some of these functions include **fetch API**, _async / await_, and _Promises_. In this article, we discuss Promises.

This article will cover the following topics:

- Defining JavaScript Promises
- Constructing a Promise
- Handling the success or failure of a Promise
- Chaining multiple Promises together

To get the most out of this article, readers should understand the fundementals of JavaScript.

### What is a Promise?

A Promise is a JavaScript object that represents the outcome of an asynchronous operation. When you work with asynchronous tasks like network requests or file reading, you can use Promises to handle the result of those tasks.

A Promise isn't the function itself, nor is it the direct result of the function. Instead, it acts as a container for a future value, which can be either a successful result or a failure (error).

The state of a Promise reflects the progress of the asynchronous operation:

- **Pending** (the operation is ongoing and hasn't completed yet)
- **Resolved**: (the operation is succesful)
- **Rejected**: (the operation has failed)

Please note that the failure of a Promise doesn't always indicate bad code. Failure can be due to external conditions not met, or explicit error handling within the code.

For example, the user of a digital library has picked a book that is not available. Based on the constructor, the promise may be rejected. The failure of this operation is due to low inventory, not bad code. Yet this condition must be explicitely stated in the promise constructor.

### Constructing a promise object

The Promise constructor method uses what is known as an **executor function**. An executor function is simple a function that returns either a resolved, or a rejected value. In most cases, this function will return both values depending on the conditions set by the developer.

The syntax for constructing a promise is as follows:

```js
const executorFunction = (resolve, reject) => {
    //function body

    if(condition){
        resolve('This promise is succesful')
    }
    else {
        reject('This promise has failed')
    }
}
const newPromise = new Promise(executorFunction)
```

We could also use the convention of nesting a promise constructor inside a regular function. Like so:

```js
const regularFunction = (argument) => {
  return new Promise ((resolve, reject) => {
    if(condition){
        resolve('This promise is succesful')
    }
    else {
        reject('This promise has failed')
    }
  })
}

```

Let us break it down:

1. (resolve, reject): resolve and reject are functions that are built into the promise constructor. They handle cases of success, or failure
2. body: the executor function body
3. if, else: if a condition is met, resolve() is triggered. Otherwise, reject() is triggered.
4. new Promise(): a promise is an object, and needs to be instantiated.

### Example: Check if a book is available

```js
//Create a database of books

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

// Write a function that checks if a book is in stock

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
```

Now, we can simply call verifyOrder, and depending on the availability of a book, it will either send a resolved value, or a reason for rejection.

But what happens after verifyOrder has run? Do we want to log the resolve/reject value to the console? Do we want to do something else? What do we do after a promise is resolved or rejected?

### Handling success and failure with .then()

The resolve / reject value can be resolved simply by passing a callback function into .then()

Let us test this with our verifyOrder function:

```js
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectedValue) => {
  console.log(rejectedValue);
};

verifyorder("Hard Drive", 5).then(handleSuccess, handleFailure);
```

1. handleSuccess(): is a callback function takes a single arguement **resolvedValue**. In case of success, this function logs the resolved value to the console.
2. handleFailure(): is a callback function that receives a single argument **rejectedValue**. In case of failure, this function logs logs the rejected value to the console.
3. .then(): receives two callback functions as arguement. The first argument is triggerd if the promise is succesful. The second arguement is triggered if the promise fails.
4. If verifyOrder succeeds, handleSuccess will execute. Otherwise, handleFailure will execute.

> Please note, once you add .then() to any promise, the promise's resolved and rejected values are automatically passed to the corresponding callback function.

But there are other ways to use the success / failure callback functions.

```js
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectedValue) => {
  console.log(rejectedValue);
};

checkAvailability("Hard Drive", 5).then(handleSuccess).then(handleFailure);
```

This code works the same way. The only difference is that rather than put both callback functions in a single .then(), we seperate the concerns. Like in the first method, the success handler needs to come first. But there is yet another way to achieve the same outcome.

```js
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectedValue) => {
  console.log(rejectedValue);
};

checkAvailability("Hard Drive", 5).then(handleSuccess).catch(handleFailure);
```

This method is similar to the 2nd method. The only difference is that we use .catch() to handle failure rather than a second .then()

Either of these three methods will simply send the resolve / reject value from verifyOrder to the respective callback functions.

But what if depending on the availability of a book, we want to trigger a new function? Let us talk about chaining promises.

### Chaining Promises / Promise Composition

In the previous exercise, we created a promise named **verifyOrder**. This promise checks if the book a customer wants is in stock. If it is in stock, the promise is rresolved, and or success handler is triggered. Otherwise, the failure handler will execute.

But what happens after that?

Well, if we verify that a book is available, we want to add that book to the user's bookshelf. But if it is not, we want to recommend other books from the same author.

Promise composition enable us to connect promises with one another. In our example, a fulfiled verifyOrder promise will trigger the checkOut Promise. If checkOut is succesful, the addToShelf promise will be triggered. A rejected verifyOrder promise will trigger the recommendBook promise. Let us see this in practice.

First, we create a **checkOut** function to handle check out. It should check the object **order**'s **libraryPoints**. If there are enough library points, the promise should deduct the required points from libraryPoints, and then add the titlein that order to the user's bookShelf. Otherwise it should be rejected.

```js
const order = {
  title: "The Innovators",
  quantity: 3,
  libraryPoints: 10,
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
```

Finally, we will add a new promise called **recommendBook**. If **verifyOrder** fails, recommendBook will highlight other books from the same author.

```js
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
```

Finally, let us chain all these newly created promises together.

```js
verifyOrder(order)
  .then(checkOut)
  .then((updatedBookShelf) => {
    console.log(
      `Your book has been added to the bookShelf: ${updatedBookShelf}`
    );
  })
  .catch(recommendBook);
```

A breakdown of what is happening here is as follows:

1. We call verifyOrder with the argument order
2. If the verifyOrder promise resolves then checkOut should execute
3. If checkOut succeeds, we chain an anonymous function to log the value of return value of checkOut. Something to note here is that .then automatically appends the return value of the previous promise as an arguement of the current promise.
4. Finally, we use .catch incase verifyOrder fails.

That is probably alot to take in. So let us discuss one final thing - best practices for using promises.
