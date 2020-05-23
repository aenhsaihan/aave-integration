import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import {
  TOKEN_SETS_DECOMPOSER_ABI,
  TOKEN_SETS_DECOMPOSER_ADDRESS,
} from "./config";

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3("http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  constructor(props) {
    super(props);
    this.state = { account: "" };
  }

  async decomposeSet(e) {
    const web3 = new Web3("http://localhost:8545");
    const tokenSetsComposer = new web3.eth.Contract(
      TOKEN_SETS_DECOMPOSER_ABI,
      TOKEN_SETS_DECOMPOSER_ADDRESS
    );
    // this.setState({ tokenSetsComposer });

    const ethersi6040address = "0x93E01899c10532d76C0E864537a1D26433dBbDdB";
    const {
      components,
      units,
      prices,
      setPrice,
    } = await tokenSetsComposer.methods
      .decomposeAndPriceSet(ethersi6040address)
      .call();
    console.log(components);
    console.log(units);
    console.log(prices);
    console.log(setPrice);
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <input type="text" />
        <button onClick={this.decomposeSet}>Get</button>
        <div>Information from get</div>
      </div>
    );
  }
}

export default App;
