pragma solidity >=0.4.22 <0.7.0;

contract RebalancingSetTokenInterface {
    function currentSet() external view returns (address);
    function unitShares() external view returns (uint256);
    function naturalUnit() external view returns (uint256);
    function decimals() external view returns (uint8);
}


contract SetTokenInterface {
    function getComponents() external view returns (address[] memory);
    function getUnits() external view returns (uint256[] memory);
    function naturalUnit() external view returns (uint256);
}

contract TokenSetsCoreInterface {
    function validSets(address _set) external view returns (bool);
}


contract Decomposer {
    address public tokenSetsCoreAddress;
    TokenSetsCoreInterface tokenSetsCore;

    constructor(address _tokenSetsCoreAddress) public {
        tokenSetsCoreAddress = _tokenSetsCoreAddress;
        tokenSetsCore = TokenSetsCoreInterface(_tokenSetsCoreAddress);
    }

    function decomposeSet(address _setAddress) public view returns (address[] memory components, uint256[] memory units) {
        require(tokenSetsCore.validSets(_setAddress), "Address to decompose should be a valid TokenSet Address");

        RebalancingSetTokenInterface tokenSet = RebalancingSetTokenInterface(_setAddress);
        uint256 intermediateUnitsInSet = tokenSet.unitShares() * (10 ** uint256(tokenSet.decimals())) / tokenSet.naturalUnit();

        SetTokenInterface intermediateSet = SetTokenInterface(tokenSet.currentSet());

        address[] memory collateralAddresses = intermediateSet.getComponents();
        uint256[] memory collateralUnits = new uint256[](collateralAddresses.length);

        for(uint i = 0 ; i < collateralAddresses.length ; i++) {
            collateralUnits[i] = intermediateSet.getUnits()[i] * intermediateUnitsInSet / intermediateSet.naturalUnit();
        }

        return (collateralAddresses, collateralUnits);
    }
}
