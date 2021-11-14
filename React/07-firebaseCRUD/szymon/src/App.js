import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {db} from './functions/firebase/config';
import { doc, setDoc } from "firebase/firestore"

function App() {

  useEffect(()=>{
    const userRef=doc(db,'users','me')
    setDoc(userRef,{name:"szymon",image:"https://i.ytimg.com/vi/BCr7y4SLhck/maxresdefault.jpg"})
  },[])

  return (
    <div className="App">
      <button class="haha">Set</button>
    </div>

  );
}

export default App;