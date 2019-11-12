import React from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';
import Button from '../Button/Button';
import QuizModel from '../models/Quiz';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            correctQuizNum: 0,
            quizStep: 0,
            quizes: [],
        });
        const quizes = await QuizModel.fetchQuizAndCreateQuizes();
        this.setState({ quizes });
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
        const { quizes, quizStep } = this.state;
        if (!quizes.length && !quizStep) {
            // ロード画面
            return this.loading();
        }
        if (quizes.length > 0 && quizStep > quizes.length - 1) {
            // 再スタート画面
            return this.restart();
        }

        // クイズ表示画面
        const quiz = quizes[quizStep];
        const answers = quiz.shuffledAnswers().map( (answer, index) => {
            return (
                <li key={index}>
                    <Button onClickHandler={() => this.answerCheck(answer, quiz.correctAnswer)}>
                        {answer}
                    </Button>
                </li>
            );
        });
        return (
            <div>
                <h1>Quiz</h1>
                <h2>{quiz.question}</h2>
                <ul className="answer-container">{answers}</ul>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }

    loading() {
        return (
            <div>
                <h1>Quiz</h1>
                <p>Now Loading...</p>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }

    restart() {
        return (
            <div>
                <h1>Quiz</h1>
                <h2>Result</h2>
                <h3>Corrected Answer is: {this.state.correctQuizNum}/{this.state.quizes.length}</h3>
                <Button onClickHandler={this.quizFetch}>ReStart</Button>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }
}

export default Quiz;