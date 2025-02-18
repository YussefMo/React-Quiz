function Progress({ numQuestions, index, pointes, maxPoints, answer }) {
    const hasAnswer = answer !== null
    return (
        <header className="progress">
            <progress max={numQuestions} value={index+ +hasAnswer} />
            <p>Question <strong>{index+1}</strong> / {numQuestions} </p>
            <p><strong>{pointes}</strong> / {maxPoints} Points</p>
        </header>
    )
}

export default Progress
