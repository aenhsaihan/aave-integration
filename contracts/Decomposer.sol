pragma solidity >=0.4.22 <0.7.0;

// ERC20 Interface
interface ERC20 {
    function decimals() external view returns (uint8);
}


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
        // Create the interface with the TokenSetsCore.
        // Used to validate the Set to decompose.
        tokenSetsCoreAddress = _tokenSetsCoreAddress;
        tokenSetsCore = TokenSetsCoreInterface(_tokenSetsCoreAddress);

        // Create the interface with the Aave Price Oracle.
        // Used to price this Set in ETH.
        aaveLPAddressesProviderAddress = _lpAddressesProviderAddress;
        LendingPoolAddressesProvider provider = LendingPoolAddressesProvider(
            _lpAddressesProviderAddress
        );
        priceOracle = IPriceOracleGetter(provider.getPriceOracle());
    }

    function getAssetPrice(address _asset) public view returns (uint256 price) {
        (, , , price) = decomposeAndPriceSet(_asset);
        return price;
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
        // Validate the address to decompose is a valid TokenSet.
        require(
            tokenSetsCore.validSets(_setAddress),
            "Address to decompose should be a valid TokenSet Address"
        );

        // Load the Address as a RebalancingSetToken.
        RebalancingSetTokenInterface tokenSet = RebalancingSetTokenInterface(
            _setAddress
        );

        // Calculate how many units of the intermediate Set (SetToken)
        // are composing this RebalancingSetToken.
        uint256 intermediateUnitsInSet = (tokenSet.unitShares() *
            (10**uint256(tokenSet.decimals()))) / tokenSet.naturalUnit();

        // Load the intermediate set as a SetToken
        SetTokenInterface intermediateSet = SetTokenInterface(
            tokenSet.currentSet()
        );

        // Get the components in the intermediateSet
        components = intermediateSet.getComponents();
        // Initialize the array of units
        // we will calculate in a loop the amount of units of the component
        // are composing the TokenSet (RebalancingSetToken)
        units = new uint256[](components.length);
        // Get the prices of the components by calling the Aave PriceOracle.
        prices = priceOracle.getAssetsPrices(components);
        // Accumulator for the SetPrice. Initialize as 0.
        setPrice = 0;
        bool gotAllPrices = true;

        for (uint256 i = 0; i < components.length; i++) {
            // By multiplying the units of the component in this intermediateSet
            //  times the units of intermediateSet in the TokenSet we will get 
            //  the units of component in the TokenSet.
            units[i] =
                (intermediateSet.getUnits()[i] * intermediateUnitsInSet) /
                intermediateSet.naturalUnit();
            // By multiplying the units just calculated times the price of this component
            //  and dividing by the decimals of the component we will get the price in ETH
            //  accumulate the price when there is more than one component.
            setPrice += (prices[i] * units[i]) /
                (10 ** uint256(ERC20(components[i]).decimals()));

            // In case one of the prices is missing, we don't want to return an incorrect price.
            if (prices[i] == 0) {
                gotAllPrices = false;
            }
        }

        if (!gotAllPrices) setPrice = 0;

        return (components, units, prices, setPrice);
    }
}
