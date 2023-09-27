1. Use effect can help improve the speed of a website by using it to render functionality only when it is needed. 
2. use effect is used to: 
   1. fetch data from a back-end service.
   2. subscribe to a stream of data.
   3. manage timers and intervals.
   4. read from and make changes to the DOM.

There are three key moments when the Effect Hook can be utilized:
    1. When the component is first added, or mounted, to the DOM and renders.
    2. When the state or props change, causing the component to re-render.
    3. When the component is removed, or unmounted, from the DOM.

Use effect only come into playy when a prop or useSetter renders.
To avoid issues and bugs, always set the reversal of the use effect inside the same call back function. This will ensure that after the effect comes into play, it goes back until it is called again. 

Examples

```js
function PageTitle() {
  const [name, setName] = useState('');
 
  useEffect(() => {
    document.title = `Hi, ${name}`;
  });

  // Everytime setName changes name, the page title changes to name. 
```
```js 
export default function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => { alert(`Count: ${count}`)

  })
// Everytime setCount changes count, an alter is created that shows the current value of count. 
```

Can you think of another use cases? 

Here's one: everytime a user likes a tweet, the setter changeLikes changes the value of likes. Then the useEffect records that event and sends it to an analysitc dashboard.

Here's another: An effect hook can be used to update the url of a site to the name of the user. 



Syntax: 
1. It has no return value, but it calls another function. useEffect( a function that executes the effect.)
2. It is used inside the component whose props or hook triggers the effect. 
3. The first arguement is the callback function. But to control when th effect takes place, you can add a second arguement called the dependency array. 
4. You can use an empty dependency array to call the effect hook only after the components first render. 