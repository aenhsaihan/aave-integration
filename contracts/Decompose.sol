pragma solidity >=0.4.22 <0.7.0;


/************
@title IPriceOracleGetter interface
@notice Interface for the Aave price oracle.*/
interface IPriceOracleGetter {
    function getAssetPrice(address _asset) external view returns (uint256);

    function getAssetsPrices(address[] calldata _assets)
        external
        view
        returns (uint256[] memory);

    function getSourceOfAsset(address _asset) external view returns (address);

    function getFallbackOracle() external view returns (address);
}


interface LendingPoolAddressesProvider {
    function getPriceOracle() external view returns (address);
}


interface RebalancingSetTokenInterface {
    function getComponents() external view returns (address[] memory);
}


interface SetTokenInterface {
    function getComponents() external view returns (address[] memory);
}


contract Decompose {
    address public rbAddress;
    RebalancingSetTokenInterface rbContract;

    address public setAddress;
    SetTokenInterface setContract;

    address public collateralAddress;

    IPriceOracleGetter priceOracle;

    constructor(address _rbAddress) public {
        rbAddress = _rbAddress;
        rbContract = RebalancingSetTokenInterface(_rbAddress);

        LendingPoolAddressesProvider provider = LendingPoolAddressesProvider(
            address(0x24a42fD28C976A61Df5D00D0599C34c4f90748c8)
        );
        address priceOracleAddress = provider.getPriceOracle();
        priceOracle = IPriceOracleGetter(priceOracleAddress);
    }

    function getComponents() public view returns (address[] memory) {
        return rbContract.getComponents();
    }

    function setIntermediateAddress() public {
        address[] memory components = this.getComponents();
        setAddress = components[0];
    }

    function setIntermediateContract() public {
        setContract = SetTokenInterface(setAddress);
    }

    function getIntermediateComponents()
        public
        view
        returns (address[] memory)
    {
        return setContract.getComponents();
    }

    function setCollateralAddress() public {
        address[] memory components = this.getIntermediateComponents();
        collateralAddress = components[0];
    }

    function getAssetPrice(address collateral) public view returns (uint256) {
        return priceOracle.getAssetPrice(collateral);
    }
}
