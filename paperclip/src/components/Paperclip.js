import React from 'react';
import ls from 'local-storage';
import paperclip from '../images/paperclip.jpg';
import ai from '../images/ai.webp';
import './Paperclip.css';

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
    }, this.checkGame());
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
      }), this.checkGame());
    }
  }

  checkGame() {
    if(this.state.paperclips >= 1000) {
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
      let newScores = [];
      let i = 0;
      while(i < 10 && i < scores.length) {
        newScores.push(scores[i++]);
      }

      ls.set('scores', newScores);
    }
  }



  render() {
    return (
      <div className="gamearea">
        {
          this.state.gameStart ? 
            <div class="game-grid">
              <img onClick={this.makePaperClip} src={paperclip} alt="Paperclips" width="250px" height="250px" />
              <img onClick={this.buyAutoClipper} src={ai} alt="Automatic Clipper" width="250px" height="250px" />

              <span>Paperclips: {this.state.paperclips}</span>
              <span>Clippers: {this.state.autoclipers}</span>
            </div>
            :
            <div>
              <p>Success! You made 1,000 paper clips</p>
              <p>Your score is {this.state.gameTime} seconds.</p>
              <button onClick={() => window.location.reload(false)}>Go Back!</button>
            </div>
        }
      </div>
    );
  }
}

export default Paperclip;
