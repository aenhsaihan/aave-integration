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

        uint oneCTokenInUnderlying;
        if (cToken.decimals() > underlying.decimals()) {
            oneCTokenInUnderlying = cToken.exchangeRateStored() * (10 ** (uint256(cToken.decimals()) - uint256(underlying.decimals())));
        } else {
            oneCTokenInUnderlying = cToken.exchangeRateStored() / (10 ** (uint256(underlying.decimals()) - uint256(cToken.decimals())));
        }

        return (oneCTokenInUnderlying * priceOracle.getAssetPrice(cToken.underlying())) / 1 ether;
    }
}
