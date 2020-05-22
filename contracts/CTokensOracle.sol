pragma solidity >=0.4.22 <0.7.0;

interface CToken {
  function exchangeRateCurrent() returns (uint);
  function underlying() returns (address);
  function decimals() returns (unit8);
}

interface UnderlyingToken {
  function decimals() returns (unit8);
}

interface LendingPoolAddressesProvider {
    function getPriceOracle() external view returns (address);
}

interface IPriceOracleGetter {
    function getAssetPrice(address _asset) external view returns(uint256);

    function getAssetsPrices(address[] calldata _assets)
        external
        view
        returns (uint256[] memory);
}

contract CTokensOracle {
  address public aaveLPAddressesProviderAddress;
  IPriceOracleGetter priceOracle;

  constructor(address _lpAddressesProviderAddress) public {
    // Create the interface with the Aave Price Oracle.
    // Used to price this Set in ETH.
    aaveLPAddressesProviderAddress = _lpAddressesProviderAddress;
    LendingPoolAddressesProvider provider = LendingPoolAddressesProvider(
        _lpAddressesProviderAddress
    );
    priceOracle = IPriceOracleGetter(provider.getPriceOracle());
  }

  function getAssetPrice(address _cTokenAddress) public view returns (uint25) {
    cToken = CToken(_cTokenAddress);
    underlying = UnderlyingToken(cToken.underlying());
    uint oneCTokenInUnderlying = cToken.exchangeRateCurrent() /
      (10 ** (18 + uint256(underlying.decimals() - cToken.decimals())));

    return oneCTokenInUnderlying * priceOracle.getAssetPrice(underlying);
  }
}