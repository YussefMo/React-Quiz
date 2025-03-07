import { useQuestionsContext } from "../context/QuestionsContext"

function Progress() {
    const { numQuestions, index, points, maxPoints, answer } = useQuestionsContext()
    
    const hasAnswer = answer !== null
    return (
        <header className="progress">
            <progress max={numQuestions} value={index+ +hasAnswer} />
            <p>Question <strong>{index+1}</strong> / {numQuestions} </p>
            <p><strong>{points}</strong> / {maxPoints} Points</p>
        </header>
    )
}

export default Progress
