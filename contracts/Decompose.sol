pragma solidity >=0.4.22 <0.7.0;


contract RebalancingSetTokenInterface {
    address public currentSet;
    uint256 public unitShares;
    uint256 public naturalUnit;
    uint8 public decimals;
}


contract SetTokenInterface {
    address[] public components;
    uint256[] public units;
    uint256 public naturalUnit;

    function getComponents() external view returns (address[] memory);
    function getUnits() external view returns (uint256[] memory);
}


contract Decompose {
    address public rbAddress;
    RebalancingSetTokenInterface rbContract;

    address public setAddress;
    SetTokenInterface setContract;
    uint256 public setTokenUnitsInRbSet;

    address[] public collateralAddresses;
    uint256[] public collateralUnits;

    constructor(address _rbAddress) public {
        rbAddress = _rbAddress;
        rbContract = RebalancingSetTokenInterface(_rbAddress);
        setTokenUnitsInRbSet = rbContract.unitShares() / rbContract.naturalUnit();

        setAddress = rbContract.currentSet();
        setContract = SetTokenInterface(setAddress);

        collateralAddresses = setContract.getComponents();
        setCollateralUnits();
    }

    function getCollateralAddresses() public view returns (address[] memory) {
        return collateralAddresses;
    }

    function getCollateralUnits() public view returns (uint256[] memory) {
        return collateralUnits;
    }

    function getSetToken() public view returns (address) {
        return setAddress;
    }

    function setCollateralUnits() private {
        for(uint i = 0 ; i < getCollateralAddresses().length ; i++) {
            collateralUnits[i] = setContract.getUnits()[i] / setContract.naturalUnit() * setTokenUnitsInRbSet;
        }
    }
}
