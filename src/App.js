import './App.css';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get our database we must import the corresponding firebase modules
import { getDatabase, onValue, push, ref, remove } from 'firebase/database';

function App() {
  // create books state that will store our database info
  const [books, setBooks] = useState([]);
  // create stateful value that is bound to input
  const [userInput, setUserInput] = useState('');

  // event that will fire everytime there is a change in our input
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    // prevent default behaviour on submit (refresh)
    event.preventDefault();
    // create a referenece to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // get the information from our userInput state
    console.log(userInput);
    // send it off to our database using .push
    push(dbRef, userInput);
    // reset the input after submitting by chnaging the state to empty string
    setUserInput("");
  }

  const handleRemoveBook = (bookId) => {
    // identify the node to be removed, and call remove() with that node
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${bookId}`);
    // call remove() to
    remove(dbRef);
  }

  // get useEffect function to run side effects on component mount
  useEffect( () => {
    // create a variable that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference to our datbase
    const dbRef = ref(database);
    // get database info on load (or on change)
    // use event listener onValue
    onValue(dbRef, (response) => {
      // use Firebase's .val() to parse our database info into the format we need
      const data = response.val();
      // create an empty array
      const newState = [];
      // data is an object, so we iterate through it using a for in loop to access each book name
      for (let key in data) {
        // inside the loop, we push each book name to the empty array
        newState.push(
          {key: key, name :data[key]}
          );
          // 🔼🔼🔼 ABOVE 🔼🔼🔼
          // 1. make an object
          // 2. build a property called "key" that has a value of the object's key
          // 3. build a property called name that has a value of the key's value

          // OR

          // turn this:
            // -NMjXaYZrFT1CrlSg8P3: "Harry Potter and the Chamber of Secrets"

          // into this:
            // key: -NMjXaYZrFT1CrlSg8P3,
            // name: "Harry Potter and the Chamber of Secrets"

      }
      // set books state to match no-longer-empty array
      setBooks(newState);

    })
    
  }, [])

  return (
    <div className="">
      <form action="submit">  
        <label htmlFor="newBook"></label>
        <input 
          onChange={handleInputChange} 
          value={userInput} 
          type="text" 
          id="newBook" />
        <button onClick={handleSubmit}>Add Book</button>
      </form>
      <ul>
        {/* map over books state to display book in <li> */}
        {books.map((book) => {
          return (
            // to get ⬇️⬇️⬇️ rid of unique key error
            <li key={book.key}>
              <p>{book.name} 📚</p>
              <button onClick={() => {handleRemoveBook(book.key)}}>Remove</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
