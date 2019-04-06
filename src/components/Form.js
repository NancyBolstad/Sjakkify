import React, { Component } from "react";

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        playerList: [],
        requestHasError: false,
        rating:""
      };
      this.setMyRating = this.setMyRating.bind(this);
      this.setOpponentRating = this.setOpponentRating.bind(this);
      this.setGameResult = this.setGameResult.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
      const url =
        "https://us-central1-chessscore.cloudfunctions.net/getEloScoreBoard";
  
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
      this.setState({ myRating: e.target.value });
    }

    setOpponentRating(e) {
        this.setState({ opponentRating: e.target.value });
      }

      setGameResult(e) {
        this.setState({ gameResult: e.target.value });
      }

    handleSubmit(event) {
        event.preventDefault();
        const url=`https://us-central1-chessscore.cloudfunctions.net/getNewRating?myRating=${this.state.myRating}&opponentRating=${this.state.opponentRating}&myGameResult=${this.state.gameResult}`
        fetch(url)
        .then(response=>(response.json()))
        .then(data=>this.setState({rating:data.newRating}))
      }
  
    render() {
      if (!this.state.error) {
        const rating=this.state.rating;  
        return (
            <form onSubmit={this.handleSubmit}>
        <label>
          Spiller A:
          <select onChange={this.setMyRating}>
          <option value="" disabled selected>Choose your option</option>
            {
            this.state.playerList.map(item => (
            <option value={item.rating}>
              {item.name}
            </option>
          ))
            }
          </select>
        </label>
        <label>
            Spiller B:
            <select onChange={this.setOpponentRating}>
          <option value="" disabled selected>Choose your option</option>
            {
            this.state.playerList.map(item => (
            <option value={item.rating}>
              {item.name}
            </option>
          ))
            }
          </select>
        </label>
        <label>
            Resultat:
            <select onChange={this.setGameResult}>
          <option value="" disabled selected>Choose your option</option>
          <option value="0">Tap spiller A</option>
          <option value="0.5">Uavgjort</option>
          <option value="1">Seier spiller A</option>
          </select>
        </label>
        <input type="submit" value="Kalkuler ELO" />
        <div>Din nye rating:{rating}</div>
      </form>
        );
      } else {
        return <div>Something wrong</div>;
      }
    }
  }
  
  export default Form;