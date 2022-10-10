// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract AITracker {
    address public dapp_address;
    address payable public owner;
    int32 total_runs;
    int32 correct_predictions;
    int32 incorrect_predictions;

    event Stats(address dapp_address, int32 total_runs, int32 correct_predictions, int32 incorrect_predictions);

    constructor(address _dapp_address) payable {

        total_runs = 0;
        correct_predictions = 0;
        incorrect_predictions = 0;
        dapp_address = _dapp_address;
        owner = payable(msg.sender);
    }

    function updateStats(bool isCorrect,address _dapp_address) public {
        require(msg.sender == owner, "You aren't the owner");
        require(dapp_address == _dapp_address, "Dapp addresses don't match");
        total_runs++;
        if(isCorrect){
            correct_predictions++;
        }else{
            incorrect_predictions++;
        }
        emit Stats(dapp_address,total_runs,correct_predictions,incorrect_predictions);
    }

    function fetchStats() external view returns (address,int32,int32,int32) {
        return (dapp_address,total_runs,correct_predictions,incorrect_predictions); 
    }
}
