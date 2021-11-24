import { useRef } from 'react';
import './App.css';
import { db } from './firebase/config.js';
import { useEffect, useState } from 'react';
import { doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import landMP3 from './audio/land.mp3';
import seaMP3 from './audio/sea.mp3';

let choice = ""
let isPlay = true;
let seaLandFirestore;


function App() {
  const [firestoreSL,setFirestoreSL]=useState("")

  const [userName, setUserName] = useState("")
  const circle = useRef(null);
  console.dir(circle);

  useEffect(() => {
    const unsubsscribe = onSnapshot(doc(db, "gameFiles", "seaOrLand"), (refreshSeaLand) => {
      setFirestoreSL = refreshSeaLand.data().decision;
    })
  
    return unsubsscribe()
  }, [])

  function handleClick(ev) {
    const x = ev.clientX;
    const y = ev.clientY;
    choice = ev.target.id;
    circle.current.style.top = `${y - 5}px`;
    circle.current.style.left = `${x - 5}px`;
    setDoc(doc(db, 'users', userName), { userX: x, userY: y })
    if (choice === seaLandFirestore) {
      console.log("yay")
    }
    else {
      isPlay = false
    }
  }

  const sea = new Audio(seaMP3);
  const land = new Audio(landMP3);
  function StartGame() {
    setInterval(function () {
      const random = Math.random();
      let seaOrLand;
      if (random < 0.5) {
        seaOrLand = "Sea";
        sea.play()
      }
      else {
        seaOrLand = "Land"
        land.play()
      }
      console.log(seaOrLand)
      setDoc(doc(db, 'gameFiles', "seaOrLand"), { decision: seaOrLand });
    }, 1000)
  }

  // function ResetGame (){
  //   setDoc(doc(db, 'gameFiles', numberOfUsers), {});
  // };
  function handleSet(ev) {
    ev.preventDefault();
    const setName = ev.target.elements.nameBox.value;
    const setImage = ev.target.elements.imgBox.value;
    const lowerName = setName.toLowerCase();
    setUserName(lowerName);
    console.log(setName, setImage);
    setDoc(doc(db, 'users', lowerName), { image: setImage });
  }

  return (
    <div className="App">
      <form onSubmit={handleSet}>
        <input type='text' placeholder='Enter your name' name='nameBox' />
        <input type='text' placeholder='Enter your image url' name='imgBox' />
        <input type="submit" placeholder="submit"></input>
      </form>
      {/* <button onClick={ResetGame}></button> */}
      <button onClick={StartGame}>Start Game</button>
      {isPlay ? <div><div id='Sea' className='box blue' onClick={handleClick}></div>
        <div id='Land' className='box brown' onClick={handleClick}></div>
        <div ref={circle} className='circle'></div> </div> : <div>"You Lose"</div>}

    </div>
  );
}

export default App;
