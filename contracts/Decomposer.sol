pragma solidity >=0.4.22 <0.7.0;


// TokenSets Interfaces
interface RebalancingSetTokenInterface {
    function currentSet() external view returns (address);

    function unitShares() external view returns (uint256);

    function naturalUnit() external view returns (uint256);

    function decimals() external view returns (uint8);
}


interface SetTokenInterface {
    function getComponents() external view returns (address[] memory);

    function getUnits() external view returns (uint256[] memory);

    function naturalUnit() external view returns (uint256);
}


interface TokenSetsCoreInterface {
    function validSets(address _set) external view returns (bool);
}


// Aave Interfaces
interface LendingPoolAddressesProvider {
    function getPriceOracle() external view returns (address);
}


interface IPriceOracleGetter {
    function getAssetsPrices(address[] calldata _assets)
        external
        view
        returns (uint256[] memory);
}


contract Decomposer {
    address public tokenSetsCoreAddress;
    TokenSetsCoreInterface tokenSetsCore;

    address public aaveLPAddressesProviderAddress;
    IPriceOracleGetter priceOracle;

    constructor(
        address _tokenSetsCoreAddress,
        address _lpAddressesProviderAddress
    ) public {
        tokenSetsCoreAddress = _tokenSetsCoreAddress;
        tokenSetsCore = TokenSetsCoreInterface(_tokenSetsCoreAddress);

        aaveLPAddressesProviderAddress = _lpAddressesProviderAddress;
        LendingPoolAddressesProvider provider = LendingPoolAddressesProvider(
            _lpAddressesProviderAddress
        );
        priceOracle = IPriceOracleGetter(provider.getPriceOracle());
    }

    function decomposeAndPriceSet(address _setAddress)
        public
        view
        returns (
            address[] memory components,
            uint256[] memory units,
            uint256[] memory prices,
            uint256 setPrice
        )
    {
        require(
            tokenSetsCore.validSets(_setAddress),
            "Address to decompose should be a valid TokenSet Address"
        );

        RebalancingSetTokenInterface tokenSet = RebalancingSetTokenInterface(
            _setAddress
        );
        uint256 intermediateUnitsInSet = (tokenSet.unitShares() *
            (10**uint256(tokenSet.decimals()))) / tokenSet.naturalUnit();

        SetTokenInterface intermediateSet = SetTokenInterface(
            tokenSet.currentSet()
        );

        components = intermediateSet.getComponents();
        units = new uint256[](components.length);
        prices = priceOracle.getAssetsPrices(components);
        setPrice = 0;

        for (uint256 i = 0; i < components.length; i++) {
            units[i] =
                (intermediateSet.getUnits()[i] * intermediateUnitsInSet) /
                intermediateSet.naturalUnit();
            setPrice += prices[i] * units[i];
        }

        return (components, units, prices, setPrice);
    }
}
