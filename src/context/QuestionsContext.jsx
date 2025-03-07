import { useContext, createContext, useState, useEffect, useReducer } from "react"
import axios from "axios"

const QuestionsContex = createContext()

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
                status: state.quizTimer === 0 ? 'finished' : state.status,
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        default:
            throw new Error('Unknown action')
    }
}

function QuestionsContextProvider({ children }) {
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
        <QuestionsContex.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            quizTimer,
            dispatch,
            numQuestions,
            maxPoints,
            dispatch,
        }}>
            {children}
        </QuestionsContex.Provider>
    )
}

function useQuestionsContext() {
    const context = useContext(QuestionsContex)
    if (!context) {
        throw new Error('useQuestionsContext must be used within a QuestionsContextProvider')
    }
    return context
}

export { QuestionsContextProvider, useQuestionsContext }
