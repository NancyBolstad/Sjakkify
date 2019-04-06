import React, { Component } from "react";

class PlayerSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      requestHasError: false,
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    if (!this.state.error) {
      return (
          <select onChange={this.handleChange}>
          <option value="" disabled selected>Choose your option</option>
            {
            this.state.playerList.map(item => (
            <option value={item.rating}>
              {item.name} | current rating: {item.rating}
            </option>
          ))
            }
          </select>
      );
    } else {
      return <div>Something wrong</div>;
    }
  }
}

export default PlayerSelector;
