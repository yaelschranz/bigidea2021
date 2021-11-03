import {useState} from 'react';
import './ImageSelector.css'

function ImageSelector(){

    const[ image1, setImage]= useState();
    function handleClick(ev)
    {
        let id= ev.target.getAttribute('');
        console.log(id);
        setImage(id+1);
    }
    
   return(
       <div className= "container">
        <div  className= 'image' id= "img1" onClick={handleClick}>  </div>,  
        <div  className= 'image' id= "img2" onClick={handleClick}>  </div>, 
        <div  className= 'image' id= "img3" onClick={handleClick}>  </div>,
        <div  className= 'bigimage' style= {{backgroundImage:{image1}}}></div>
        </div>

   )
    
}

export default ImageSelector;