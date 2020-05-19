# HackMoney Aave-TokenSet Integration

HackMoney project to integrate TokenSet as collateral for the Aave protocol

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
npm install -g truffle
npm install -g ganache-cli
```

### Running ganache-cli mainnet fork

Restart after every 128 blocks or you will get an error about Project ID not being able to access archive state. This is because the Infura node cannot access state beyond the latest 128 blocks.

```
ganache-cli --fork https://mainnet.infura.io/v3/{YOUR-INFURA-PROJECT-ID}
```

### Result

```
Ganache CLI v6.9.1 (ganache-core: 2.10.2)
eth_blockNumber

Available Accounts
==================
(0) 0x2cc5864B70eEe6710567FE9b9D1a028BEeD6105A (100 ETH)
...


Private Keys
==================
(0) 0x59bab42bd606ebc86714d5b9a726b393ada5bc876d22fc561db3f82d06add0c6
...

HD Wallet
==================
Mnemonic:      offer color jewel segment slogan casino cherry puzzle arrange play reopen over
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991

Forked Chain
==================
Location:    https://mainnet.infura.io/v3/{YOUR-PROJECT-ID}
Block:       10093498
Network ID:  1
Time:        Mon May 18 2020 18:41:28 GMT-0700 (Pacific Daylight Time)

Listening on 127.0.0.1:8545
```

## Running the tests

- In https://api.tokensets.com/public/v1/rebalancing_sets you will see each set has an address
- that Address is a IRebalancingSetToken (https://github.com/SetProtocol/set-protocol-contracts/tree/master/contracts/core/interfaces)
- if you explore that address in etherscan, they have a function called getComponent which returns another address
  that address is for a ISetToken which is an intermediary Token,
- this token has another getComponent function which now returns the actual collateral (DAI, WETH, WBTC, USDC, etc)
- so IRebalancingSetToken has ISetToken which has the actual Token used as collateral (the composition)

```
truffle test --network mainnetfork
```

### Tests

- Get components of rebalancing token set contract
- Get and set address of intermediate token contract
- Set underlying collateral address

```
it("should get components of ETHRSIAPY contract")
it("should set intermediate address")
it("should set intermediate contract")
it("should set collateral address")
```

## Built With

- [Aave](https://aave.com/) - DeFi lending protocol
- [TokenSet](https://www.tokensets.com/) - DeFi portfolio management protocol
- [ChainLink](https://chain.link/) - Decentralized Oracle network

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Miguel**
- **Anar Enhsaihan**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- HackMoney
- ChainLink
- Aave
- TokenSet
