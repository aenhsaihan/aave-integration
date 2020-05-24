import React, { Component, useState } from "react";
import SetComponentList from "./components/SetComponentList";
import Web3 from "web3";
import "./App.css";
import {
  TOKEN_SETS_DECOMPOSER_ABI,
  TOKEN_SETS_DECOMPOSER_ADDRESS,
  ERC20_ABI,
  WEB3_URL
} from "./config";

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(WEB3_URL);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      components: [],
      units: [],
      prices: [],
      setPrice: "",
    };
  }

  convertPrice = (price) => {
    return price / 10 ** 18;
  };

  decomposeSet = async (e) => {
    const address = this.refs.addressInput.value;

    const web3 = new Web3(WEB3_URL);
    const tokenSetsComposer = new web3.eth.Contract(
      TOKEN_SETS_DECOMPOSER_ABI,
      TOKEN_SETS_DECOMPOSER_ADDRESS
    );

    const {
      components,
      units,
      prices,
      setPrice,
    } = await tokenSetsComposer.methods.decomposeAndPriceSet(address).call();

    const setComponents = []
    components.forEach(async (component, i) => {
      const erc20 = new web3.eth.Contract(ERC20_ABI, component);
      const tokenSymbol = await erc20.methods.symbol().call();
      const tokenDecimals = await erc20.methods.decimals().call();

      setComponents.push({
        address: component,
        symbol: tokenSymbol,
        units: units[i] / 10 ** tokenDecimals,
        price: this.convertPrice(prices[i])
      })
    });

    this.setState({
      components: setComponents,
      setPrice: this.convertPrice(setPrice),
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Decompose and Price your Token Set</h1>
        <p>Your account: {this.state.account}</p>
        <input type="text" ref="addressInput" />
        <button onClick={this.decomposeSet}>Get</button>
        <div>Set Composition:</div>
        <SetComponentList components={this.state.components} />
        <div>Set price: {this.state.setPrice} ETH</div>
      </div>
    );
  }
}

export default App;
