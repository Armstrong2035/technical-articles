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

A promise is a JavaScript object which represents, and handles the outcome of a function.
