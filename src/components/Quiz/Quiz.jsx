import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './Quiz.css';
import Home from '../Home/Home';
import Button from '../Button/Button';

const he = require('he');
const quizFetcher = require('../modules/data_fetchers/QuizFetcher');

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            correctQuizNum: 0,
            quizStep: 0,
            quizes: [],
        };
    this.quizFetch = this.quizFetch.bind(this);
    this.answerCheck = this.answerCheck.bind(this);
    }

    componentDidMount() {
        this.quizFetch();
    }

    async quizFetch() {
        this.setState({loading: true});
        const fetchData = await quizFetcher.quizFetcher();
        this.setState({
            loading: false,
            correctQuizNum: 0,
            quizStep: 0,
            quizes: fetchData,
        });
    }

    questionRender() {
        if (this.state.loading) {
            return (
                <div>Now Loading...</div>
            );
        }
        if (this.state.quizStep > this.state.quizes.length - 1) {
            return (
                <div>
                    <h2>Result</h2>
                    <h3>Corrected Answer is: {this.state.correctQuizNum}/{this.state.quizes.length}</h3>
                    <Button onClickHandler={this.quizFetch}>ReStart</Button>
                </div>
            );
        }
        
        const quiz = this.state.quizes[this.state.quizStep];
        const answers = quiz.incorrect_answers.slice();
        const correct_answer = quiz.correct_answer;
        answers.push(correct_answer);
        const shuffledAnswers = this.shuffle(answers);
        return (
            <div>
                <h2 className="question">{he.decode(quiz.question)}</h2>
                <div>
                    {shuffledAnswers.map((answer, index) => {
                        return (
                            <Button key={index} onClickHandler={() => this.answerCheck(answer, correct_answer)}>
                                {he.decode(answer)}
                            </Button>
                        );
                    })}
                </div>
            </div>
        );
    }

    answerCheck(selectedAnswer, correct_answer) {
        let correctQuizNum = this.state.correctQuizNum;
        if (selectedAnswer === correct_answer) {
            window.alert('Correct!');
            correctQuizNum++;
        } else {
            window.alert(`Incorrect...(correct answer is ${correct_answer})`);
        }
        this.setState({
            correctQuizNum: correctQuizNum,
            quizStep: this.state.quizStep + 1,
        });
    }

    render() {
        return (
            <div className="quiz-container">
                <h1 className="quiz-title">Quiz</h1>
                {this.questionRender()}
                <hr />
                <Router>
                    <ul className="return-top-link-container">
                        <li className="return-top-link"><Link to="/">トップページへ</Link></li>
                    </ul>
                    <Route path="/" exact component={Home} />
                </Router>
            </div>
        );
    }

    shuffle(array) {
        const copiedArray = array.slice();
        for (let i = copiedArray.length - 1; i >= 0; i--){
            const rand = Math.floor( Math.random() * ( i + 1 ) );
            [copiedArray[i], copiedArray[rand]] = [copiedArray[rand], copiedArray[i]]
        }
        return copiedArray;
    }
}

export default Quiz;