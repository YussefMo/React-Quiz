import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import Main from './Main';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const SEC_PER_QUESTION = 30

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: null,
    quizTimer: null,
}

function reduce(state, action) {
    switch (action.type) {
        case 'receivedData':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        case 'handelStart':
            return {
                ...state,
                status: 'active',
                quizTimer: state.questions.length * SEC_PER_QUESTION,
            }
        case 'newAnswer':
            // eslint-disable-next-line no-case-declarations
            const question = state.questions[state.index]
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            }
        case 'finishQuiz':
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        case 'restartQuiz':
            return {
                ...state,
                status: 'ready',
                index: 0,
                answer: null,
                points: 0,
                quizTimer: 10,
            }
        case 'tickTick':
            return {
                ...state,
                quizTimer: state.quizTimer - 1,
                status: state.quizTimer === 0? 'finished' : state.status,
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        default:
            throw new Error('Unknown action')
    }
}


function Container() {
    const [{ questions, status, index, answer, points, highscore, quizTimer }, dispatch] = useReducer(reduce, initialState)

    useEffect(function () {
        axios(`${import.meta.env.BASE_URL}data/questions.json`)
            .then(response => {
                dispatch({ type: 'receivedData', payload: response.data.questions })
            })
            .catch(() => {
                dispatch({ type: 'dataFailed' })
            })
    }, [])

    const numQuestions = questions.length
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === 'active' &&
                    <>
                        <Progress
                            numQuestions={numQuestions}
                            index={index}
                            pointes={points}
                            maxPoints={maxPoints}
                            answer={answer} />
                        <Questions
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                            points={points} />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                quizTimer={quizTimer} />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions} />
                        </Footer>
                    </>
                }
                {status === 'finished' &&
                    <FinishScreen
                        points={points}
                        maxPoints={maxPoints}
                        dispatch={dispatch}
                        highscore={highscore} />
                }
            </Main>
        </div>
    )
}

export default Container