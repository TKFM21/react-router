import React from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './Home.css';
import Quiz from '../Quiz/Quiz';
import Button from '../Button/Button';

function Home() {
    return (
        <div className="home">
            <h1>トップページ</h1>
            
            <Router>
                <Button><Link to="/quiz/">Quiz Start</Link></Button>
                <Route path="/quiz/" exact component={Quiz} />
            </Router>
        </div>
    );
}

export default Home;