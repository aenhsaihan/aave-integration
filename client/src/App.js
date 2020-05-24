import React from "react";
import SetComponentList from "./components/SetComponentList";
import Web3 from "web3";
import Big from "big.js";
import {
  TOKEN_SETS_DECOMPOSER_ABI,
  TOKEN_SETS_DECOMPOSER_ADDRESS,
  ERC20_ABI,
  WEB3_URL
} from "./config";

const web3 = new Web3(WEB3_URL);
const tokenSetsComposer = new web3.eth.Contract(
  TOKEN_SETS_DECOMPOSER_ABI,
  TOKEN_SETS_DECOMPOSER_ADDRESS
);

const convertPrice = price => price.div(10 ** 18).toString(10);
const tokenUrl = address => `http://etherscan.io/token/${address}`

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [tokenSet, setTokenSet] = React.useState('0x93E01899c10532d76C0E864537a1D26433dBbDdB');
  const [tokenSetSymbol, setTokenSetSymbol] = React.useState('');
  const [components, setComponents] = React.useState([]);
  const [tokenSetPrice, setTokenSetPrice] = React.useState(0.0);

  const handleTokenSetChange = event => {
    setTokenSet(event.target.value);
  }

  const handleFetchTokenSymbolAndDecimals = async (component) => {
    const erc20 = new web3.eth.Contract(ERC20_ABI, component);
    const tokenSymbol = await erc20.methods.symbol().call();
    const tokenDecimals = await erc20.methods.decimals().call();

    return {
      symbol: tokenSymbol,
      decimals: tokenDecimals
    }
  }

  const handleFetchTokenSetComposition = React.useCallback(async () => {
    try {
      const {
        components,
        units,
        prices,
        setPrice,
      } = await tokenSetsComposer.methods.decomposeAndPriceSet(tokenSet).call();

      const groupedComponents = await Promise.all(components.map(async (component, i) => {
        const tokenData = await handleFetchTokenSymbolAndDecimals(component);

        return {
          address: component,
          symbol: tokenData.symbol,
          units: new Big(units[i]).div(10 ** tokenData.decimals).toString(10),
          price: convertPrice(new Big(prices[i])),
          url: tokenUrl(component)
        };
      }));
      const tokenSetData = await handleFetchTokenSymbolAndDecimals(tokenSet);
      setTokenSetSymbol(tokenSetData.symbol);
      setComponents(groupedComponents);
      setTokenSetPrice(convertPrice(new Big(setPrice)));
      setIsLoading(false);
      setIsError(false);
    } catch (e) {
      setIsLoading(true);
      setIsError(e.toString());
    }
  }, [tokenSet]);

  React.useEffect(() => {
    setIsLoading(true);
    handleFetchTokenSetComposition();
  }, [handleFetchTokenSetComposition]);
  
  return (
    <div className="container">
      <h1>Decompose and Price your Token Set</h1>
      <label htmlFor="decompose">TokenSet Address:&nbsp;</label>
      <input id="decompose" type="text" value={tokenSet} autoFocus onChange={handleTokenSetChange}/>
      < hr />
      {isError && <p>Something went wrong: {isError}</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <div>Set price: <strong>{tokenSetPrice} ETH</strong></div>
          <div>Set Composition for <strong><a href={tokenUrl(tokenSet)}>{tokenSetSymbol}</a>:</strong></div>
          <SetComponentList components={components}/>
        </div>
      )}
    </div>
  );
}

export default App;
