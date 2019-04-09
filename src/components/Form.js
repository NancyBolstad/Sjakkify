import React, { Component } from "react";
import {PLAYERS_ENDPOINT, CALCULATE_ELO_ENDPOINT} from "../util/constants"

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      requestHasError: false,
      rating: ""
    };
    this.setMyRating = this.setMyRating.bind(this);
    this.setOpponentRating = this.setOpponentRating.bind(this);
    this.setGameResult = this.setGameResult.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showNewRating=this.showNewRating.bind(this);
  }
  componentDidMount() {
    const url = PLAYERS_ENDPOINT;

    (async () => {
      try {
        const data = await (await fetch(url)).json();
        this.setState({
          playerList: data
        });
      } catch (error) {
        this.setState({
          error: true
        });
      }
    })();
  }

  setMyRating(e) {
    const selectedPlayer = this.state.playerList.find((item) => item.rating == e.target.value);
    this.setState({ 
      myRating: selectedPlayer.rating,
      myName:selectedPlayer.name
    });
    console.log(selectedPlayer.name);
  }

  setOpponentRating(e) {
    const myOpponent = this.state.playerList.find((item) => item.rating == e.target.value);
    if(myOpponent.name!=this.state.myName){
    this.setState({ 
      opponentRating: myOpponent.rating,
      opponentName: myOpponent.name
    });}else{
      alert("Wrong selection")
      return
    }
  }

  setGameResult(e) {
    this.setState({ gameResult: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const url = `${CALCULATE_ELO_ENDPOINT}?myRating=${
      this.state.myRating
    }&opponentRating=${this.state.opponentRating}&myGameResult=${
      this.state.gameResult
    }`;

    (async () => {
      try {
        const data = await (await fetch(url)).json();
        this.setState({
          rating: data.newRating
        });
      } catch (error) {
        this.setState({
          error: true
        });
      }
    })();
  }

  showNewRating(){
      const rating = parseInt(this.state.rating);
      if(rating>0 && !this.state.error){
      return `Din nye rating: ${rating}`;
      }
  }

  render() {
    if (!this.state.error) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Spiller A:
            <select onChange={this.setMyRating}>
              <option value="" disabled selected>
                Choose your option
              </option>
              {this.state.playerList.map(item => (
                <option value={item.rating}>{item.name}</option>
              ))}
            </select>
          </label>
          <label>
            Spiller B:
            <select onChange={this.setOpponentRating}>
              <option value="" disabled selected>
                Choose your option
              </option>
              {this.state.playerList.map(item => (
                <option value={item.rating}>{item.name}</option>
              ))}
            </select>
          </label>
          <label>
            Resultat:
            <select onChange={this.setGameResult}>
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="0">Tap spiller A</option>
              <option value="0.5">Uavgjort</option>
              <option value="1">Seier spiller A</option>
            </select>
          </label>
          <input type="submit" value="Kalkuler ELO" />
          <div>{this.showNewRating()}</div>
        </form>
      );
    } else {
      return <div>Something wrong</div>;
    }
  }
}

export default Form;