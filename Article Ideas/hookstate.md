const letterList = [];

const [letter, letterPicker] = useState(false);

fnunction Tile(){
    return (
        <div>letter ? letterList.push(letter):   </div>
        <div onClick = {()=> letterPicker(true)}>
        </div>
    )
}



The local state variable.
The setter.
The use state function, and default values.
Hooks are used to render dynamic data. useState() is used to do the same by using the setter to mutate or impact the local state variable.  

Hooks are used to change the value of an element when an element is triggered. 
The setter always does the job of mutating the local state variable. 

We can sometimes use a setter in a function, and pass a callback function into it. 

``` js
const increment = () => setCount(prevCount => prevCount + 1);

```

increment is the main function, and it has no parameters. 
in the body of incrememnt, setCount is a setter function which takes in a call back function. 
setCound takes an anonymous callback, or a named one whose parameter is prevCount. 
In the body of the anonymous function, prevCount is incremented by 1. 

The setter is always a function, but because it has been abstracted away by the react team, you don't always have to define it as such. Although there are times when you need to do so. 

The moment a setter is defined, it is already seen as a function. Any value passed into it either thought () or a callback function is seen as its return value. 

We use this callback function because this is an async, meaning that prevCount needs to be logged before prevCount + 1. The current value of count depends on the value of prevCount. 