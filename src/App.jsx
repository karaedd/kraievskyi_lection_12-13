import React, { Component } from 'react';
import './App.css';
import Button1 from './components/Button';
import Input from './components/Input';
import History from "./components/History";
import axios from 'axios';
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            previousNumber: "",
            currentNumber: "",
            operator: "",
            history: [],
            result: "",
            examples: []
        };
    }

    addToInput = val => {
        this.setState({ input: this.state.input + val });
    };

    addDecimal = val => {
        if (this.state.input.indexOf(".") === -1) {
            this.setState({ input: this.state.input + val });
        }
    };

    addZeroToInput = val => {
        if (this.state.input !== "") {
            this.setState({ input: this.state.input + val });
        }
    };

    clearInput = () => {
        this.setState({ input: "" });
    };

    setOperator = async val => {
        if (!this.state.input.length && val !== '-') {
            return
        }
        if (this.state.input.includes(this.state.operator) && this.state.input.indexOf(this.state.operator) === this.state.input.length - 1 && this.state.input.indexOf(this.state.operator) > 0) {
            await this.setState({ input: this.state.input.replace(this.state.operator, val) })
            this.setState({ operator: val })
            return
        }
        await this.evaluate()
        await this.setState({ operator: val })
        this.setState({ input: this.state.input + val })
    }

    evaluate = async () => {
        if (this.state.input.includes(this.state.operator) && this.state.input.indexOf(this.state.operator) === this.state.input.length - 1 && this.state.input.indexOf(this.state.operator) > 0 ) {
            return
        }
        if(this.state.input[0] === '-' && !this.state.input.includes(this.state.operator)) {
            return
        }
        const numbers = this.state.input.split(this.state.operator)
        if (numbers.length > 1) {
            await this.setState({
                previousNumber: numbers[0],
                currentNumber: numbers[1]
            })
            if (this.state.operator === "+") {
                await this.setState({
                    result: parseFloat(this.state.previousNumber)
                                + parseFloat(this.state.currentNumber)
                });
            } else if (this.state.operator === "-") {
                await this.setState({
                    result: parseFloat(this.state.previousNumber)
                                - parseFloat(this.state.currentNumber)
                });
            } else if (this.state.operator === "*") {
                await this.setState({
                    result: parseFloat(this.state.previousNumber)
                                * parseFloat(this.state.currentNumber)
                });
            } else if (this.state.operator === "/") {
                if (parseFloat(this.state.currentNumber) === 0) {
                    await this.setState({
                        result: 'Error division by zero'
                    });
                } else {
                    await this.setState({
                        result: parseFloat(this.state.previousNumber)
                                    / parseFloat(this.state.currentNumber)
                    });
                }
            }
            await this.setState({
                history: [
                    ...this.state.history,
                    `${this.state.input}=${this.state.result}`
                ]
            })
            await this.setState({
                previousNumber: "",
                currentNumber: "",
                input: String(this.state.result)
            }) 
        }
    }

    getExamples = async () => {
        try {
            const examples = await axios.get('http://localhost:8080/math/examples', { params: { count: 5 } })
            await this.setState({
                examples
            })
            const mathOperators = /[\+|\-|\*|\/]/
            for (const example of this.state.examples) {
                await this.setState({
                    operator: example.match(mathOperators)[0],
                    input: example
                })
                await this.evaluate()
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div className='app'>
                <div className='calc-wrapper'>
                    <div className='row'>
                        <History>{this.state.history}</History>
                    </div>
                    <div className='row'>
                        <Input>{this.state.input}</Input>
                    </div>
                    <div className='row'>
                        <Button1 handleClick={this.addToInput}>7</Button1>
                        <Button1 handleClick={this.addToInput}>8</Button1>
                        <Button1 handleClick={this.addToInput}>9</Button1>
                        <Button1 handleClick={this.setOperator}>/</Button1>
                    </div>
                    <div className='row'>
                        <Button1 handleClick={this.addToInput}>4</Button1>
                        <Button1 handleClick={this.addToInput}>5</Button1>
                        <Button1 handleClick={this.addToInput}>6</Button1>
                        <Button1 handleClick={this.setOperator}>*</Button1>
                    </div>
                    <div className='row'>
                        <Button1 handleClick={this.addToInput}>1</Button1>
                        <Button1 handleClick={this.addToInput}>2</Button1>
                        <Button1 handleClick={this.addToInput}>3</Button1>
                        <Button1 handleClick={this.setOperator}>+</Button1>
                    </div>
                    <div className='row'>
                        <Button1 handleClick={this.addDecimal}>.</Button1>
                        <Button1 handleClick={this.addZeroToInput}>0</Button1>
                        <Button1 handleClick={this.evaluate}>=</Button1>
                        <Button1 handleClick={this.setOperator}>-</Button1>
                    </div>
                    <div className='row'>
                        <Button1 handleClear={this.clearInput}>Clear</Button1>
                    </div>
                    <div className='row'>
                        <Button1 handleClear={this.getExamples}>Get and solve examples</Button1>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
