import React, { useState } from 'react';

function BuggyCounter() {
    const [counter, setCounter] = useState(0);

    function handleClick() {
        setCounter(counter + 1);
    }

    if (counter === 5) {
        // Simulate a JS error
        throw new Error('I crashed!');
    }

    return <h1 onClick={handleClick}>{`Click to count: ${counter}`}</h1>;
}

export default BuggyCounter;
