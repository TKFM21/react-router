import QuizFetcher from '../../../src/components/data_fetchers/QuizFetcher';

describe('data_fetchers/QuizFetcher Test', () => {
    describe('class Method', () => {
        it('fetch methodで10件のデータが取得できる', async () => {
            const quizes = await QuizFetcher.fetch();

            expect( Array.isArray(quizes) ).toStrictEqual(true);
            expect( quizes.length ).toStrictEqual(10);
            quizes.forEach(quiz => {
                expect( typeof quiz ).toStrictEqual('object');
                expect( typeof quiz.question ).toStrictEqual('string');
                expect( typeof quiz.correct_answer ).toStrictEqual('string');
                
                expect( Array.isArray(quiz.incorrect_answers) ).toStrictEqual(true);
                quiz.incorrect_answers.forEach(answer => {
                    expect( typeof answer ).toStrictEqual('string');
                });
            });
        });
    });
});