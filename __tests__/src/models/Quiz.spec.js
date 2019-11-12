import Quiz from '../../../src/components/models/Quiz';

const testQuiz = {
    question: 'question!',
    correctAnswer: 'Answer!',
    incorrectAnswers: [
        'Bat1',
        'Bat2',
        'Bat3'
    ],
};

describe('models/Quiz Test', () => {
    describe('InstanceMethod', () => {
        describe('constructor', () => {
            it('引数が保持されているかを確認', () => {
                const quiz = new Quiz(testQuiz);
                expect( quiz._question ).toStrictEqual(testQuiz.question);
                expect( quiz._correctAnswer ).toStrictEqual(testQuiz.correctAnswer);
                expect( quiz._incorrectAnswers ).toStrictEqual(testQuiz.incorrectAnswers);
            });
        });

        describe('getter', () => {
            it('question + correctAnswer', () => {
                const quiz = new Quiz(testQuiz);
                expect( quiz.question ).toStrictEqual(testQuiz.question);
                expect( quiz.correctAnswer ).toStrictEqual(testQuiz.correctAnswer);
            });
        });

        describe('shuffle Method', () => {
            it('shuffle array', () => {
                const quiz = new Quiz(testQuiz);
                expect( quiz.shuffledAnswers() ).not.toStrictEqual([ testQuiz.correctAnswer, ...testQuiz.incorrectAnswers ]);
            });
        });
    });
    describe('classMethod', () => {
        describe('fetchQuizAndCreateQuizes', () => {
            it('配列に10個のQuizインスタンスが取得できる', async () => {
                const quizes = await Quiz.fetchQuizAndCreateQuizes();
                expect( Array.isArray(quizes) ).toStrictEqual(true);
                expect( quizes.length ).toStrictEqual(10);
                quizes.forEach(quiz => {
                    expect( quiz instanceof Quiz ).toStrictEqual(true);
                });
            });
        });
    });
});