import React,{ Component } from 'react';
import Board from '../components/Board/Board';
import classes from './game.css';

class Game extends Component {
    state = {
        history: [
            {
                squares: Array(9).fill(null),
                box: null
            }
        ],
        stepNumber: 0,
        xIsNext: true,
        isAscend: true
    };


    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    box: i
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    sortHistory = () => {
        this.setState((prevState) => ({
            isAscend : !prevState.isAscend
            }
        ));
    }

    render() {
        let status;
        let display = null;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            let desc;
            if(this.state.isAscend){
                 desc = move ?
                    'Go to move #' + move + ' in block ' + calculateRow(history[move].box) :
                    'Go to game start';
            } else {
                desc =  move !== history.length-1 ? 'Go to move #' + (history.length - move - 1) + ' in block '  + calculateRow(history[history.length-move-1].box):
                    'Go to game start';
            }
            if(move === 9 && !result) {
                display = true;
            }

            return (
                <li key={move} className={classes.ul}>
                    <button
                        className={classes.Button}
                        onClick={() => this.jumpTo(this.state.isAscend ? move : (history.length-1-move))}>{desc}</button>
                </li>
            );
        });


        let winner;
        if (result) {
            winner = result[0];
            status = "Winner: " + winner;
        } else if (display){
            status = " Match Draw ";
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        // console.log(this.state.history[this.state.stepNumber].squares);
        // for( let i=1;i<9;i++) {
        //     if(this.state.history[this.state.stepNumber].squares[i] !== null && !winner){
        //         console.log('no winner');
        //     }
        // }

        return (
            <div className={classes.body}>
                <div className={classes.Game}>
                    <div className={classes.GameBoard}>
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                            winLine={result}
                        />
                    </div>
                </div>
                <div className={classes.GameInfo}>
                    <div className={classes.status}>{status}</div>
                    <ol className={classes.ol}>{moves}</ol>
                </div>
                <button onClick={this.sortHistory}>SORT</button>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}
function calculateRow(num) {
    let row = (num / 3).toFixed(0) ;
    const column = num % 3 ;
    if(row === '3'){
        row = 2;
    }
    return ('row ' + row + ' column ' + column );
}
export default Game;
