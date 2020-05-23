pragma solidity >=0.4.22 <0.7.0;

interface CToken {
    function exchangeRateStored() external view returns (uint256);

    function underlying() external view returns (address);

    function decimals() external view returns (uint8);
}


interface UnderlyingToken {
    function decimals() external view returns (uint8);
}


interface LendingPoolAddressesProvider {
    function getPriceOracle() external view returns (address);
}


interface IPriceOracleGetter {
    function getAssetPrice(address _asset) external view returns (uint256);

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

    function getAssetPrice(address _cTokenAddress) public view returns (uint256) {
        CToken cToken = CToken(_cTokenAddress);
        UnderlyingToken underlying = UnderlyingToken(cToken.underlying());


        // This math is not correct yet. revisit
        return (cToken.exchangeRateStored() * priceOracle.getAssetPrice(cToken.underlying())) /
            (10**(18-uint256(underlying.decimals())));
    }
}
