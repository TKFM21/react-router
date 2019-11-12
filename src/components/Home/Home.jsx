import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from '../Button/Button';

function Home() {
    return (
        <div className="home">
            <h1>トップページ</h1>
            <Link to="/quiz/"><Button>Quiz Start</Button></Link>
        </div>
    );
}

export default Home;