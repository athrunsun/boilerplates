import * as React from 'react';

class BuggyCounter extends React.Component<any, { counter: number }> {
    public state = {
        counter: 0,
    };

    private handleClick = () => {
        this.setState(({ counter }) => ({
            counter: counter + 1,
        }));
    };

    public render() {
        if (this.state.counter === 5) {
            // Simulate a JS error
            throw new Error('I crashed!');
        }
        return <h1 onClick={this.handleClick}>{`Click to count: ${this.state.counter}`}</h1>;
    }
}

export default BuggyCounter;
