// aave protocol
const IPriceOracleABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_assets",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_sources",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_fallbackOracle",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "source",
        type: "address",
      },
    ],
    name: "AssetSourceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fallbackOracle",
        type: "address",
      },
    ],
    name: "FallbackOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address[]",
        name: "_assets",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_sources",
        type: "address[]",
      },
    ],
    name: "setAssetSources",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_fallbackOracle",
        type: "address",
      },
    ],
    name: "setFallbackOracle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "getAssetPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address[]",
        name: "_assets",
        type: "address[]",
      },
    ],
    name: "getAssetsPrices",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "getSourceOfAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getFallbackOracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const LendingPoolAddressesProviderABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "EthereumAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeProviderUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolConfiguratorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolCoreUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolDataProviderUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolLiquidationManagerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolManagerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolParametersProviderUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingPoolUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "LendingRateOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "PriceOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "ProxyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "TokenDistributorUpdated",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "setLendingPoolImpl",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPoolCore",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_lendingPoolCore",
        type: "address",
      },
    ],
    name: "setLendingPoolCoreImpl",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPoolConfigurator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_configurator",
        type: "address",
      },
    ],
    name: "setLendingPoolConfiguratorImpl",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPoolDataProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_provider",
        type: "address",
      },
    ],
    name: "setLendingPoolDataProviderImpl",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPoolParametersProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_parametersProvider",
        type: "address",
      },
    ],
    name: "setLendingPoolParametersProviderImpl",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getFeeProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_feeProvider",
        type: "address",
      },
    ],
    name: "setFeeProviderImpl",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPoolLiquidationManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_manager",
        type: "address",
      },
    ],
    name: "setLendingPoolLiquidationManager",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingPoolManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_lendingPoolManager",
        type: "address",
      },
    ],
    name: "setLendingPoolManager",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getPriceOracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_priceOracle",
        type: "address",
      },
    ],
    name: "setPriceOracle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getLendingRateOracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_lendingRateOracle",
        type: "address",
      },
    ],
    name: "setLendingRateOracle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTokenDistributor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenDistributor",
        type: "address",
      },
    ],
    name: "setTokenDistributor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const lpAddressProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const lpAddressProviderContract = new web3.eth.Contract(
  LendingPoolAddressesProviderABI,
  lpAddressProviderAddress
);

const Decomposer = artifacts.require("Decomposer");
const truffleAssert = require("truffle-assertions");
let decomposeInstance;

// mainnent token sets
const ethrsiapyAddress = "0x136faE4333EA36A24bb751E2d505D6ca4Fd9f00b";
const btcEth7525Address = "0xA35Fc5019C4dc509394Bd4d74591a0bF8852c195";
const ethersi6040address = "0x93E01899c10532d76C0E864537a1D26433dBbDdB";

// mainnet collateral addresses
const CUSDC = "0x39AA39c021dfbaE8faC545936693aC917d5E7563";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

contract("Decomposer", (accounts) => {
  before(async () => {
    decomposeInstance = await Decomposer.deployed();
  });

  it("should get components of ETHERSI6040 contract", async () => {
    const {
      components,
      units,
      prices,
      setPrice,
    } = await decomposeInstance.decomposeAndPriceSet.call(ethersi6040address);

    assert.equal(
      components.length,
      1,
      "There must be only 1 component in this Set"
    );
    assert.include([USDC, WETH], components[0]);

    // Get the latest PriceOracle address
    const priceOracleAddress = await lpAddressProviderContract.methods
      .getPriceOracle()
      .call()
      .catch((e) => {
        throw Error(`Error getting priceOracle address: ${e.message}`);
      });

    // Get the asset price
    const priceOracleContract = new web3.eth.Contract(
      IPriceOracleABI,
      priceOracleAddress
    );
    const assetPrice = await priceOracleContract.methods
      .getAssetPrice(components[0])
      .call()
      .catch((e) => {
        throw Error(`Error getting priceOracle price: ${e.message}`);
      });

    assert.equal(assetPrice, prices[0].toNumber());
    assert(units[0].gt(0));
  });

  it("should getAssetPrice of ETHERSI6040 contract", async () => {
    const price = await decomposeInstance.getAssetPrice.call(ethersi6040address);
    assert(price > 0);
  });

  it("should get components of ETHRSIAPY contract", async () => {
    const {
      components,
      units,
      prices,
      setPrice,
    } = await decomposeInstance.decomposeAndPriceSet.call(ethrsiapyAddress);

    assert.equal(
      components.length,
      1,
      "There must be only 1 component in this Set"
    );
    assert.include([CUSDC, WETH], components[0]);
    assert(units[0].gt(0));

    // Currently neither CUSDC nor WETH return prices, so we can validate that setPrice is 0
    assert.equal(setPrice, 0);
  });

  it("should getAssetPrice of ETHRSIAPY contract", async () => {
    // Currently neither CUSDC nor WETH return prices, so we can validate that setPrice is 0
    const price = await decomposeInstance.getAssetPrice.call(ethrsiapyAddress);
    assert.equal(price, 0);
  });

  it("should get components of BTCETH7525 contract", async () => {
    const {
      components,
      units,
    } = await decomposeInstance.decomposeAndPriceSet.call(btcEth7525Address);

    assert.equal(
      components.length,
      2,
      "There must be 2 components in this Set"
    );
    assert.include(components, WETH, "wETH should be a component.");
    assert.include(components, WBTC, "wBTC should be a component.");
    assert(units[0].gt(0));
    assert(units[1].gt(0));
  });

  it("should getAssetPrice of BTCETH7525 contract", async () => {
    // Currently WETH doesn't have a price oracle on Aave, so even though wBTC has it
    // the returned price should be 0.
    const price = await decomposeInstance.getAssetPrice.call(btcEth7525Address);
    assert.equal(price, 0);
  });

  it("should reject when address to decompose is not a Set", async () => {
    const decomposeInstance = await Decomposer.deployed();
    await truffleAssert.fails(
      decomposeInstance.decomposeAndPriceSet.call(
        "0xf3862af14cbb4d9b781e41a3d4d74e7c2cdb73e2"
      ),
      truffleAssert.ErrorType.REVERT,
      "Address to decompose should be a valid TokenSet Address"
    );
  });
});
