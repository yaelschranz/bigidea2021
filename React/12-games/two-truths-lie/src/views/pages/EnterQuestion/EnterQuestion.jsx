// import './EnterQuestions.css'

function EnterQuestions() {
    function handleSubmit(ev) {
        ev.preventDefault()
        console.log(ev)
    }



    return (
        <div className='Container'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='truth1' placeholder='enter first truth here' />
                <input type='text' name='truth2' placeholder='enter second truth here' />
                <input type='text' name='lie' placeholder='enter lie here' />
                <input type='submit' value='submit' />
            </form>
        </div>
    )

}
export default EnterQuestions;