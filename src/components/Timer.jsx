import { useEffect } from "react"

function Timer({ dispatch, quizTimer }) {
    const min = Math.floor(quizTimer / 60)
    const sec = quizTimer % 60

    useEffect(function () {
        const quizTimer = setInterval(()=>{
            dispatch({type:'tickTick'})
        }, 1000)
        return () => clearInterval(quizTimer)
    }, [dispatch])

    return (
        <div className="timer">
            {`${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`}
        </div>
    )
}

export default Timer