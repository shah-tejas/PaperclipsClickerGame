import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      paperclips: 0,
      autoclipers: 0
    };
    this.makePaperClip = this.makePaperClip.bind(this);
    this.buyAutoClipper = this.buyAutoClipper.bind(this);
    this.autobuy = this.autobuy.bind(this);
    setInterval(() => {
      this.autobuy();
    }, 500);
  }

  makePaperClip() {
    this.setState(prevState => {
      return {paperclips: prevState.paperclips+1}
    });
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
    }
  }

  render() {
    return (
      <div className="App">
        Paperclips: {this.state.paperclips} <br/>
        Clippers: {this.state.autoclipers}<br/>
  
        <button onClick={this.makePaperClip}>Make Paperclip</button><br/>
        <button onClick={this.buyAutoClipper}>Buy Automatic Clipper (costs 5 paperclips)</button>
      </div>
    );
  }
}

export default App;
