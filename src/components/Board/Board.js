import React, { Component } from 'react';
import Square from '../Square/Square';
import classes from './Board.css';

class Board extends Component {
    renderSquare(i,doHighLight) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={doHighLight}
            />
        );
    }

    render() {
        const highlight = Array(9).fill(false);
        if(this.props.winLine){
            highlight[this.props.winLine[1][0]] = true;
            highlight[this.props.winLine[1][1]] = true;
            highlight[this.props.winLine[1][2]] = true;
        }
        return (

            <div className={classes.Board}>
                {
                    [0, 1, 2].map(i => (
                            <div className={classes.boardRow} key={i}>
                                {
                                    [0, 1, 2].map(j => this.renderSquare(3 * i + j,highlight[3 * i + j]))
                                }
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

        // <div className={classes.Board}>
        //
        //         <div className={classes.boardRow}>
        //             {this.renderSquare(0)}
        //             {this.renderSquare(1)}
        //             {this.renderSquare(2)}
        //         </div>
        //         <div className={classes.boardRow}>
        //             {this.renderSquare(3)}
        //             {this.renderSquare(4)}
        //             {this.renderSquare(5)}
        //         </div>
        //         <div className={classes.boardRow}>
        //             {this.renderSquare(6)}
        //             {this.renderSquare(7)}
        //             {this.renderSquare(8)}
        //         </div>
        //     </div>


export default Board;
