import React from 'react';
import './App.css';
import Paperclip from './components/Paperclip';
import ls from 'local-storage';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    let oldscores = ls.get('scores') ? ls.get('scores') : [];
    this.state = {
      startGame: false,
      scores: oldscores
    };
    this.start = this.start.bind(this);
    this.checkGameStatus = this.checkGameStatus.bind(this);
    this.updateScores = this.updateScores.bind(this);
  }

  start() {
    this.setState(() => ({
      startGame : true
    }));
    ls.set('startGame', true);
    // let gamestatusinterval = setInterval(() => {
    //   this.checkGameStatus();
    //   if(!this.state.startGame) {
    //     this.updateScores();
    //     clearInterval(gamestatusinterval);
    //   }
    // }, 600);
  }

  checkGameStatus() {
    if(!ls.get('startGame')) {
      this.setState({
        startGame: false
      });
    }
  }

  updateScores() {
    this.setState({
      scores: ls.get('scores')
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.startGame ?
            <Paperclip /> :
            <div>
              <button onClick={this.start}>Start Game!</button>
              <h3>High Scores:</h3>
              <ul>
                {this.state.scores.map((score, index) => (
                  <li key={index}>{score}</li>
                ))}
              </ul>
            </div>
        }
      </div>
    );
  }
}

export default App;
