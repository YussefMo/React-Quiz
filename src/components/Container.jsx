import { useQuestionsContext } from '../context/QuestionsContext';
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




function Container() {
    const { status } = useQuestionsContext()
    return (
            <div className="app">
                <Header />
                <Main>
                    {status === 'loading' && <Loader />}
                    {status === 'error' && <Error />}
                    {status === 'ready' && <StartScreen />}
                    {status === 'active' &&
                        <>
                            <Progress />
                            <Questions />
                            <Footer>
                                <Timer />
                                <NextButton />
                            </Footer>
                        </>
                    }
                    {status === 'finished' &&
                        <FinishScreen />
                    }
                </Main>
            </div>
    )
}

export default Container