## Introduction

Modern web development requires asynchronicity. Sometimes, a function needs to run only if a prior function is successful. At other times, multiple tasks within an application must occur simultaneously.
While some programming languages are **multi-threaded** - capable of handling asynchronous (async) operations naturally, JavaScript is a **single-threaded** language. It necessitates special tools to manage async use-cases, and one of these tools is a Promise.

This article will cover the following topics:

- Defining JavaScript Promises
- Constructing a JavaScript Promise
- Handling the success or failure of a Promise
- Chaining multiple Promises together
- Running Concurrent Promises
- Common Mistakes when Writing Promises

To make the most of this article, readers should have a fundamental understanding of JavaScript concepts.

### What is a Promise?

A Promise is a JavaScript object that represents the outcome of an asynchronous operation. When you work with asynchronous tasks like network requests or file reading, you can use Promises to handle the result of those tasks.

A Promise isn't the function itself, nor is it the direct result of the function. Instead, it acts as a container for a future value, which can be either a successful result or a failure (error).

The state of a Promise reflects the progress of the asynchronous operation:

- **Pending** (the operation is ongoing and hasn't completed yet)
- **Resolved**: (the operation is succesful)
- **Rejected**: (the operation has failed)

It's important to note that the failure of a Promise doesn't always indicate bad code. Failure can be due to external conditions not met, or explicit error handling within the code.

For example, the user of a digital library has picked a book that is not available. Based on the constructor, the promise may be rejected. The failure of this operation is not due to low inventory, not bad code. But this condition must be explicitely stated in the promise constructor.

### Constructing a promise object

The Promise constructor method takes the executor function. The executor function is triggered whenever the promise is called.

The syntax for constructing a promise is as follows:

```pseudo
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

Let us break it down:

1. (resolve, reject): resolve() and reject() are functions that are built into the promise constructor. They handle cases of success, or failure
2. body: the executor function body
3. if, else: if a condition is met, resolve() is triggered. Otherwise, reject() is triggered.
4. new Promise(): a promise is an object, and needs to be instantiated.

### Example: Check if a book is available

```js
//Create a database of books

const books = [
  ["Steve Jobs", "Sir Isaac Walterson", 5],
  ["Elon Musk", "Sr Isaac Walterson", 1],
  ["Hard Drive", "James Wallace", 3],
];

// Write a function that checks if a book is in stock

const checkAvailability = (title, quantity) => {
  // Let checkAvailablity return an instance of an anonymous promise

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
```

One thing that standsout in this example is that the executor function is nexted inside another function. That is because an executor function can be used as a callback function! This convention is convenient for instantiating the promise within a function. Now, we can simply call checkAvailablity, and depending on the availability of a book, it wille either resolve, or return value.

But what happens after checkAvailability has run? Do we want to log the resolve/reject value to the console? Do we want to do something else? What do we do after a promise is resolved or rejected?

### Handling success and failure with .then()

The resolve / reject value can be resolved simply by passing a callback function into .then()

Let us test this with our checkAvaibability function:

```js
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectedValue) => {
  console.log(rejectedValue);
};

checkAvailability("Hard Drive", 5).then(handleSuccess, handleFailure);
```

1. handleSuccess(): is a callback function takes a single arguement **resolvedValue**. In case of success, this function logs whatever is in resolved() to the console.
2. handleFailure(): is a callback function that receives a single argument **rejectedValue**. In case of failure, this function logs whatever is in rejected() to the concole.
3. .then(): receives two callback functions. The first callback is triggerd if the promise is succesful. The second callback is triggered if the promise fails.
4. If 5 copies of Hard Drive are in stock, handleSuccess will execute. Otherwuise, handleFalure will execute.

> Do you notice that we only referenced checkAvailability when we add .then? Why hav we not referenced checkAvilability in either of the success or failure callback functions? That is because once we attach .then() to any promise, resolved() / rejected() are automatically passed to resolvedValue and rejectedValue.

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

Either of these three methods will simply send the resolve / reject value from checkAvailability to the respective callback functions. But what if depending on the availability of a book, we want to either execute a checkout function, or something else? Let us talk about chaining promises.

### Chaining Promises / Promise Composition
