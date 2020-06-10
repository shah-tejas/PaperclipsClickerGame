import React from 'react';
import ls from 'local-storage';

class Paperclip extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      paperclips: 0,
      autoclipers: 0,
      startTime: new Date(),
      gameStart: true,
      gameTime: 0
    };
    this.makePaperClip = this.makePaperClip.bind(this);
    this.buyAutoClipper = this.buyAutoClipper.bind(this);
    this.autobuy = this.autobuy.bind(this);
    this.checkGame = this.checkGame.bind(this);
    this.intervalId = setInterval(() => {
      this.autobuy();
    }, 500);
  }

  makePaperClip() {
    this.setState(prevState => {
      return {paperclips: prevState.paperclips+1}
    });
    this.checkGame();
  }

  buyAutoClipper() {
    if(this.state.paperclips >= 5) {
      this.setState(prevState => {
        return {
          paperclips: prevState.paperclips-5,
          autoclipers: prevState.autoclipers+1
        }
      });
    }
  }

  autobuy() {
    if(this.state.autoclipers) {
      this.setState(prevState => ({
        paperclips: prevState.paperclips + prevState.autoclipers
      }));
      this.checkGame();
    }
  }

  checkGame() {
    if(this.state.paperclips >= 10) {
      let gameEnd = (new Date().getTime() - this.state.startTime.getTime()) / 1000;
      this.setState({
        gameStart: false,
        gameTime: gameEnd
      });
      clearInterval(this.intervalId);
      ls.set('startGame', false);
      let scores = ls.get('scores');
      if(!scores) {
        scores = [];
      }
      scores.push(gameEnd);
      scores.sort((score1, score2) => score1 - score2);
      let scoresCount = 0;
      scores.filter(score => scoresCount++ <= 10);

      ls.set('scores', scores);
    }
  }



  render() {
    return (
      <div className="App">
        {
          this.state.gameStart ? 
            <div>
              Paperclips: {this.state.paperclips} <br/>
              Clippers: {this.state.autoclipers}<br/>
  
              <button onClick={this.makePaperClip}>Make Paperclip</button><br/>
              <button onClick={this.buyAutoClipper}>Buy Automatic Clipper (costs 5 paperclips)</button>
            </div>
            :
            <div>
              <p>Game Over!</p>
              <p>Your score is {this.state.gameTime} seconds.</p>
              <button onClick={() => window.location.reload(false)}>Go Back!</button>
            </div>
        }
      </div>
    );
  }
}

export default Paperclip;
