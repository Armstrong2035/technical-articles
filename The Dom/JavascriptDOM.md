Title: JavaScript DOM first principles
Subtitle: 6 simple mental models that will help you master DOM events faster. 

## Introduction:  
Having learned HTML for structure, CSS for styling, and JavaScript for logic - the DOM brings everything together. 

In the DOM, there are many keywords and rules to remember. And when rules are plenty, first principles become doubly important. 

The first principles for manipulating the DOM with JavaScript are as follows: 
- Everything you do in the DOM falls under one of four broad categories
- If you plan to reuse an element, assign it to a variable
- Understand the order in which DOM keywords appear
- Events are objects and they could have various targets. 

This article assumes that you have a decent grasp of  HTML, CSS, and JavaScript. You know how to use the DOM, but are struggling with remembering what to do and when to do it. 

### Mental model 1, Four broad categories
When manipulating the DOM with JavaScript, there are four broad categories of things you can do. The categories are as follows: 
- Access any element you have in your HTML or CSS.
- Modify any element you access by assigning it a new value. 
- Create an event handler that comes to life when that element is triggered. 
- Create an event handler that comes to life when an event is triggered.

### Mental model 2, Variables make life easier
You can do without them, but using variables while navigating the dom will simplify things. Whenever you access an element that you will use more than once, it is profitable to assign it to a variable. 


#### Example: 
One way to change the color of the HTML element with ID 'button' two seperate times is: 
```js
.document.getElementById(‘button’).addEventListener(‘click’, changeColor)
.document.getElementById(‘button’).addEventListener(‘click’, resetColor)
```

Another way to it is: 
```js 
Let targetButton = .document.getElementById(‘button’)
targetButton.addEventListener(‘click’, changeColor);
targetButton.addEventListener(‘click’, resetColor);

```
The first option makes the code look a little messy. On the other hand, when we assign an accessed element to a variable - we can use that variable going forward. It makes for neater code. 



### Mental model 3, The order is everything
While manipulating the DOM, a lot of different keywords are chained together. It can sometimes be confusing when we just try to power our way through it. But a smarter way is to understand the order in which things typically happen in the dom. 

When modifying HTML and CSS elements, the order is: 
```pseudo
.document.selector.property = 'value'
```
When using event handlers, the order is: 
```pseudo
eventTarget.eventHandler('trigger', function);
or
eventObject.target.eventHandler('trigger', function)

```

The order is as follows: 
1. Document is the used keyword to access a DOM element. 
2. Selector tells JavaScript how you want it to find the element. You can access it by id, class, query, and more. 
3. Property is the specific part of the element you want to change. For example, the style, its inner HTML, or even its parent node. 
4. Value is the new value you want to assign to that element. 


So ask yourself, how do you want to identify the element you want to manipulate? What is the element you want to manipulate? How do you want to manipulate that element? 




