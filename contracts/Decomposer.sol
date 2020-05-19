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


contract Decomposer {
    function decomposeSet(address _tokenSetAddress) public view returns (address[] memory components, uint256[] memory units) {
        RebalancingSetTokenInterface tokenSet = RebalancingSetTokenInterface(_tokenSetAddress);
        uint256 intermediateUnitsInSet = tokenSet.unitShares() * 1 ether / tokenSet.naturalUnit();

        SetTokenInterface intermediateSet = SetTokenInterface(tokenSet.currentSet());

        address[] memory collateralAddresses = intermediateSet.getComponents();
        uint256[] memory collateralUnits = new uint256[](collateralAddresses.length);

        for(uint i = 0 ; i < collateralAddresses.length ; i++) {
            collateralUnits[i] = intermediateSet.getUnits()[i] * intermediateUnitsInSet / intermediateSet.naturalUnit();
        }

        return (collateralAddresses, collateralUnits);
    }
}
