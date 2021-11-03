import { useState } from "react";

function List() {
    const [words, setWords] = useState([{id:1, word:'apple'}, {id:2, word:'baby'}, {id:3, word:'cat'}, {id:4, word:'duck'}, {id:5, word:'elephant'}]);
    
    function handleDelete(index){
        console.log('delete', index)

        let wordsTemp = [...words];
        wordsTemp.splice(index, 1)
        console.log(wordsTemp);
        setWords(wordsTemp);

    }
    
    return(
        <div className = "list">
            {words.map((word, index) => {
                return <div 
                    key={word.id} 
                    className="word"
                    onClick = {() => handleDelete(index)}
                    > {word.word}, id:{(word.id)} </div>;
            })}
        </div>
    )

}
export default List