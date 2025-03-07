import { useQuestionsContext } from "../context/QuestionsContext"

function Questions() {
    const { questions , dispatch, answer, index } = useQuestionsContext()

    const hasAnswer = answer !== null
    const question = questions[index]

    return (
        <div>
            <h4>{question.question}</h4>
            <div className="option">
                {question.options.map((option, i) => (
                    <button
                        onClick={() => dispatch({ type: 'newAnswer', payload: i })}
                        key={option}
                        className={`btn btn-option 
                            ${i === answer ? 'answer' : ''}
                            ${hasAnswer ? i === question.correctOption ? 'correct' : 'wrong' : ''}`}
                        disabled={hasAnswer}>{option}</button>
                ))}
            </div>
        </div>
    )
}

export default Questions
