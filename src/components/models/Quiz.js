import _ from 'lodash';
import he from 'he';
import QuizFetcher from '../data_fetchers/QuizFetcher';

class Quiz {
    constructor({ question, correctAnswer, incorrectAnswers }) {
        this._question = question;
        this._correctAnswer = correctAnswer;
        this._incorrectAnswers = [ ...incorrectAnswers ];
    }

    get question() {
        return this._question;
    }

    get correctAnswer() {
        return this._correctAnswer;
    }

    shuffledAnswers() {
        return _.shuffle([this._correctAnswer, ...this._incorrectAnswers]);
    }

    static async fetchQuizAndCreateQuizes() {
        const quizes = await QuizFetcher.fetch();
        return quizes.map( quiz => {
            return {
                question: he.decode(quiz.question),
                correctAnswer: he.decode(quiz.correct_answer),
                incorrectAnswers: quiz.incorrect_answers.map(str => he.decode(str))
            };
        })
        .map( decodedQuiz => {
            return new Quiz(decodedQuiz)
        });
    }
}

export default Quiz;