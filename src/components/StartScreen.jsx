function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome To The React Quiz!</h2>
            <h3>{numQuestions} Question To Test Your React Mastery</h3>
            <button onClick={()=>dispatch({ type: 'handelStart' })} className="btn btn-ui">Let&apos;s Start</button>
        </div>
    )
}

export default StartScreen
