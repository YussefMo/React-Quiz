import { useQuestionsContext } from "../context/QuestionsContext"

function NextButton() {
    const { dispatch, answer, index, numQuestions } = useQuestionsContext()
    const hasAnswer = answer !== null
    if (index < numQuestions - 1) {return (
        <>
            {hasAnswer && <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>}
        </>
    )} else {return (
        <>
            {hasAnswer && <button className="btn btn-ui" onClick={() => dispatch({ type: 'finishQuiz' })}>Finish Quiz</button>}
        </>
    )}
}

export default NextButton
