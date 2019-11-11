const API_URL = 'https://opentdb.com/api.php?amount=3';

class QuizFetcher {
    static async fetch() {
        try {
            const response = await window.fetch(API_URL);
            const data = await response.json(response);
            return data.results;
        } catch(error) {
            return [];
        }
    }
}

export default QuizFetcher;