import { useQuestionsContext } from "../context/QuestionsContext";

function FinishScreen() {
    const { dispatch, highscore, points, maxPoints } = useQuestionsContext();
    const percentage = (points / maxPoints) * 100;
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
    return (

        <>
            <p className="result">
                <span>{emoji}</span>You Have Finished The Quiz Your Scored <span><strong>{points}</strong></span> out of <span>{maxPoints}</span> Your Percentage: <span><strong>{Math.ceil(percentage)}%</strong></span>
            </p>
            <p className="highscore">(Highscore : {highscore} Points)</p>
            <button className="btn btn-ui reset" onClick={() => dispatch({ type: 'restartQuiz' })}>
                Restart Quiz
            </button>
        </>
    )
}

export default FinishScreen
