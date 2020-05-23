pragma solidity >=0.4.22 <0.7.0;

import "../contracts/CTokensOracle.sol";

contract PriceOracleProxy {
  address public aaveLPAddressesProviderAddress;
  IPriceOracleGetter priceOracle;

  address public cTokensOracleAddress;
  CTokensOracle cTokensOracle;

  constructor(
    address _lpAddressesProviderAddress,
    address _cTokensOracleAddress
  ) public {
    // Create the interface with the Aave Price Oracle.
    // Used to price this Set in ETH.
    aaveLPAddressesProviderAddress = _lpAddressesProviderAddress;
    LendingPoolAddressesProvider provider = LendingPoolAddressesProvider(
        _lpAddressesProviderAddress
    );
    priceOracle = IPriceOracleGetter(provider.getPriceOracle());

    cTokensOracleAddress = _cTokensOracleAddress;
    cTokensOracle = CTokensOracle(cTokensOracleAddress);
  }

  function getAssetPrice(address _asset) external view returns (uint256) {
    if (_asset == address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)) {
      return 1 ether;
    } else if (
      _asset == address(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643) ||
      _asset == address(0x39AA39c021dfbaE8faC545936693aC917d5E7563)
    ) {
      return cTokensOracle.getAssetPrice(_asset);
    } else {
      return priceOracle.getAssetPrice(_asset);
    }
  }

  function getAssetsPrices(address[] calldata _assets)
    external
    view
    returns (uint256[] memory) {
      uint256[] memory prices = new uint256[](_assets.length);
      for (uint256 i = 0; i < _assets.length; i++) {
          prices[i] = this.getAssetPrice(_assets[i]);
      }
      return prices;
    }
}
