// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Jreevesy is ERC20, Ownable {

    uint256 private lockInPeriod = 60; 
    uint256 private _rewardRate = 2;
    mapping(address => uint256) private instake;
    mapping(address => uint256) private TimeofStake;
    constructor(address initialOwner) 
        ERC20("Jreevesy", "JRY") 
        Ownable(initialOwner)
    {}
    function mint_JRY(address to, uint256 amount) public {
        uint256 modifyAmount = amount * 1e18;
        _mint(to, modifyAmount);
    }
    function stake_JRY(uint256 amount) public {
        uint256 modifyAmount = amount * 1e18;
        require(modifyAmount > 0, "Staking zero tokens is not allowed");
        require(balanceOf(msg.sender) >= modifyAmount, "Inadequate funds");
        instake[msg.sender] += modifyAmount;
        TimeofStake[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), modifyAmount);
  }
    function getStake(address account) public view returns (uint256) {
        uint256 stakedInWei = instake[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
  }
    function withdraw__JRY() public {
        require(block.timestamp > (TimeofStake[msg.sender] + lockInPeriod), "Withdrawal of funds is not permitted at the moment as you remain within the lock-in period");
        require(instake[msg.sender] > 0, "No tokens have been staked");
        uint256 stakedAmount = instake[msg.sender];
        uint256 reward = ((block.timestamp - TimeofStake[msg.sender]) * _rewardRate) * 1e18;
        instake[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
  }
    function toWithdraw(address account) public view returns (uint256) {
        uint256 stakedAmount = instake[msg.sender] / 1e18;
        uint256 reward = ((block.timestamp - TimeofStake[account]) * _rewardRate);
        uint256 total = reward + stakedAmount; 
        return total;
  }
     function getStakeElapsed(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - TimeofStake[account]);
        return time;
  } 
    function getTimeofStake(address account) public view returns (uint256) {
        return TimeofStake[account];
  }  
}