import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about/:id'>About</Link></li>
        </ul>
        <Route path='/' exact component={Home} />
        <Route path='/about/:id' exact component={About} />
      </Router>
    </div>
  );
}

export default App;
