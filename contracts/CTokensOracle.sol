pragma solidity >=0.4.22 <0.7.0;


interface CToken {
    function exchangeRateCurrent() external returns (uint256);

    function underlying() external returns (address);

    function decimals() external returns (uint8);
}


interface UnderlyingToken {
    function decimals() external returns (uint8);
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

    function calculate(
        uint256 _exchangeRateCurrent,
        uint256 _underlyingDecimals,
        uint256 _cTokenDecimals
    ) internal pure returns (uint256) {
        return
            _exchangeRateCurrent /
            (10**(18 + _underlyingDecimals - _cTokenDecimals));
    }

    function getAssetPrice(address _cTokenAddress) public returns (uint256) {
        CToken cToken = CToken(_cTokenAddress);
        UnderlyingToken underlying = UnderlyingToken(
            address(cToken.underlying())
        );

        uint256 oneCTokenInUnderlying = calculate(
            cToken.exchangeRateCurrent(),
            underlying.decimals(),
            cToken.decimals()
        );

        return oneCTokenInUnderlying;
    }
}
