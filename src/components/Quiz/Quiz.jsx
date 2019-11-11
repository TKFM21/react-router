import React from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';
import Button from '../Button/Button';
import QuizModel from '../models/Quiz';

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

    async componentDidMount() {
        await this.quizFetch();
    }

    async quizFetch() {
        this.setState({
            loading: true,
            correctQuizNum: 0,
            quizStep: 0,
            quizes: [],
        });
        const quizes = await QuizModel.fetchQuizAndCreateQuizes();
        this.setState({
            loading: false,
            quizes,
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
        return (
            <div>
                <h2 className="question">{quiz.question}</h2>
                <div>
                    {quiz.shuffledAnswers().map((answer, index) => {
                        return (
                            <Button key={index} onClickHandler={() => this.answerCheck(answer, quiz.correctAnswer)}>
                                {answer}
                            </Button>
                        );
                    })}
                </div>
            </div>
        );
    }

    answerCheck(selectedAnswer, correct_answer) {
        let { correctQuizNum, quizStep } = this.state;
        if (selectedAnswer === correct_answer) {
            window.alert('Correct!');
            correctQuizNum++;
        } else {
            window.alert(`Incorrect...(correct answer is ${correct_answer})`);
        }
        quizStep++;
        this.setState({ correctQuizNum, quizStep });
    }

    render() {
        return (
            <div className="quiz-container">
                <h1 className="quiz-title">Quiz</h1>
                {this.questionRender()}
                <hr />
                <ul className="return-top-link-container">
                    <li className="return-top-link"><Link to="/">トップページへ</Link></li>
                </ul>
            </div>
        );
    }
}

export default Quiz;