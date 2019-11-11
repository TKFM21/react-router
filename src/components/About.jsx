import React from 'react';

function About(props) {
    return (
        <div>
            <h1 onClick={() => props.history.goBack()}>About</h1>
            <p>{props.location.pathname}</p>
            <p>{props.match.params.id}</p>
        </div>
    );
}

export default About;