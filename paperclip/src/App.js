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
        <h3>How fast can you make 1,000 paper clips?</h3>
        {
          this.state.startGame ?
            <Paperclip /> :
            <div>
              <button onClick={this.start}>Start Game!</button>
              <h3>High Scores:</h3>
                {this.state.scores.map((score, index) => (
                  <p key={index}>{score}</p>
                ))}
            </div>
        }
      </div>
    );
  }
}

export default App;
