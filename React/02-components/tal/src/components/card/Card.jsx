import './Card.css'
import tal from '../../img/tal.png'

//Becky
//Robby
//Tal 
// https://www.google.com/search?q=tal+yaron&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiuzYOrt-XzAhVL_rsIHV76AZIQ_AUoAXoECAEQAw&biw=1152&bih=753&dpr=1#imgrc=m_lRqzeT_YUBRM


function Card(props) {
    console.log(props)
    
    return (
        <div className='card'>
            <img src={tal} alt='bla' />
            <p>{props.name}</p>
            <p>Gender: {props.gender}</p>
        </div>
    )
}

export default Card;