import './SearchBar.css';
import { useState } from 'react';
import { getDatabase, ref, onValue, query, db } from "firebase/database";
import { collection, getDocs, where, getFirestore} from '@firebase/firestore';
import Logo from '../images/Logo.png';


const tags = ['newest','popular', 'recent'];





function SearchBar() {
   var searchOption;
   var filterOption;
   const db = getFirestore();
   const [articles, setArticles]= useState([])
   const [hidden, setHidden] = useState(true)
   const [tag, setTag] = useState("")    

  async function getFilter(ev){
    ev.preventDefault();
    const arr= [];
    setHidden(false)
    filterOption= ev.target.value;
    setTag(filterOption)
    console.log(ev)
    console.log(filterOption)

 
  }
  async function getTarget(ev) {
    let arr2= [];
    if (ev.key === 'Enter') {
    ev.preventDefault();
    searchOption= ev.target.value;
    console.log(searchOption);
    const q = query(collection(db, "events"), where("Title", ">=", searchOption));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {  
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arr2.push(doc.data());
    });
    if(tag=== "popular"){
      for (var i = 1; i < arr2.length; i++)
      for (var j = 0; j < i; j++)
          if (arr2[i].views > arr2[j].views) {
            var x = arr2[i];
            arr2[i] = arr2[j];
            arr2[j] = x;
          }
  

  }
  else if (tag=== "newest"){
    for (var i = 1; i < arr2.length; i++)
    for (var j = 0; j < i; j++)
        if (arr2[i].Date > arr2[j].Date) {
          var x = arr2[i];
          arr2[i] = arr2[j];
          arr2[j] = x;
        }
      }
  else if(tag=== "recent"){
    for (var i = 1; i < arr2.length; i++)
    for (var j = 0; j < i; j++)
        if (arr2[i].dateAdded > arr2[j].dateAdded) {
          var x = arr2[i];
          arr2[i] = arr2[j];
          arr2[j] = x;
        }
  };
    setArticles(arr2);
    console.log(arr2)

    }

    //insert filters
    //find articles with word in it, sort by which article has the word appear the most
    //for each article 
    // if newest --> check by date
    // if recent --> check by creation date
    // if popular --> check by most views



  
  }
  return (
    <div className='container'>
      <div className='contianer2'>
      <div className="sectionOne">
        <img className='Logo' src= {Logo} />
        <h1>Nefesh B'Nefesh</h1>
        <button onChange={console.log("does nothing yet")}>|||</button>
      </div>
      
      <input className='filterData' type="text" name= "filterData" list="data" onChange={getFilter} />
        <datalist className='data' id="data">
        {tags.map((item, key) =>
          <option key={key} value={item} />
        )}
      </datalist>
      <input className='searchBar' type="text" name= "searchBar" hidden= {hidden} onKeyPress={getTarget} />
      {articles.map((article, i) => (
    <li className="travelcompany-input" key={i}>
        <span className="input-label"> {i+1}. {article.Title} Written on {article.Date} by {article.creator} and currently has {article.views} views</span> <img src= {article.Image}/> 
    </li>
   ))}
   </div>
   <button className='Button2'>Home Page</button>
    </div>
  )
}

export default SearchBar;