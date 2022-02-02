import "../../styles/page/MainPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataFilters from "../template/DataFilters";
import { query } from "firebase/database";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";

//const tags = ["newest", "popular", "recent"];


function App() {
  const navigate = useNavigate();

  //var searchOption, filterOption;
  const db = getFirestore();
  const [articles, setArticles] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [eventListState, setEventListState] = useState([]);
  const [eventFilter, setEventFilter] = useState("Upcoming")

  function handleSearchByChange(ev) {
    let temp = ev.target.value;
    setSearchField(temp);
  }

  
  
  useEffect(() => {
    const q = query(collection(db, "events"));
    const eventListTemp = [];
    
    
    //listen to events
    const unsubuscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const eventTemp = doc.data();
        eventTemp.id = doc.id;
        eventListTemp.push(eventTemp);
      });
      console.log("ping!");
      setEventListState(eventListTemp);
    });

    return ()=>{
      return unsubuscribe()
    }
  }, []);

  
  function changeEventFilter(ev) {
    console.log("running")

    const eventListTemp = [...eventListState];
    console.log(eventListTemp)
    setEventFilter(ev.target.value); 
    console.log(eventFilter);
    if (eventFilter === "Upcoming") {
      eventListTemp.sort(function (a, b) {
        return b.startTime.seconds - a.startTime.seconds;
      });
      setEventListState(eventListTemp);
      console.log(eventListState);
    }
    if (eventFilter === "Freshly Added") {
      eventListTemp.sort(function (a, b) {
        return b.dateAdded.seconds - a.dateAdded.seconds;
      });
      setEventListState(eventListTemp);
     
      console.log(eventListTemp);
      console.log(eventListState);
    }
  }

  function handleRoute(eventId) {
    navigate("/event/" + eventId);
  }

  return (
    <div>
      <DataFilters setEventListState={setEventListState} />
      <div className="userInterfaceContainer">
        <form className="filterEvents">
          <label htmlFor="eventFilterType">
            Sort out the events displayed:
          </label>
          <select
            name="eventFilterType"
            id="eventFilterType"
            onChange={changeEventFilter}>
            <option value="Upcoming">Upcoming</option>
            <option value="Freshly Added">Freshly Added</option>
          </select>
        </form>
        <div className="eventMapContainer">
          {eventListState.map((event) => {
            return (
              <div
                key={event.id}
                className="nametag card card--link"
                onClick={()=>handleRoute(event.id)}>
                <img src={event.coverImage} alt={event.title}></img>
                <h2>{event.title}</h2>
                <div className="cardData">
                <div id="Date">Date: {new Intl.DateTimeFormat("en" , {
  timeStyle: "short",
  dateStyle: "medium"
}).format(event.startTime.seconds * 1000) }</div>
                <div id="Views">Tags: {event.tags.map(e => (<tag>{e}</tag>))}</div>
                </div>
                <div className="cardTags">
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )}

export default App;
