pragma solidity >=0.4.22 <0.7.0;


contract RebalancingSetTokenInterface {
    address public currentSet;

    function getComponents() external view returns (address[] memory);
}


contract SetTokenInterface {
    address[] public components;

    function getComponents() external view returns (address[] memory);
}


contract Decompose {
    address public rbAddress;
    RebalancingSetTokenInterface rbContract;

    address public setAddress;
    SetTokenInterface setContract;

    address public collateralAddress;

    constructor(address _rbAddress) public {
        rbAddress = _rbAddress;
        rbContract = RebalancingSetTokenInterface(_rbAddress);
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
}
