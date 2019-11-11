const API_URL = 'https://opentdb.com/api.php?amount=3';

module.exports = {
    quizFetcher: async () => {
        try {
            const response = await window.fetch(API_URL);
            const data = await response.json(response);
            return data.results;
        } catch(error) {
            return [];
        }
    }
};