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
    address public rbAddress = 0x136faE4333EA36A24bb751E2d505D6ca4Fd9f00b;
    RebalancingSetTokenInterface rbContract = RebalancingSetTokenInterface(
        rbAddress
    );

    address public setAddress;
    SetTokenInterface setContract;

    address public collateralAddress;

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
