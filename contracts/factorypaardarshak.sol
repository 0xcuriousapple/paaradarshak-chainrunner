pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./paardarshak.sol";

/**
* @title Factory paardarshak
* @author Abhishek Vispute
*/

contract factorypaardarshak {
    
   address [] funds;
   
   struct fundinfo {
       string name;
       string description;
   }
   
   mapping (address => fundinfo) fundstore;
   
   function createFunds(string memory _fname, string memory _fdescription) public {
      paardarshak newfund = new paardarshak(_fname, _fdescription,msg.sender);
    //   funds[address(newfund)] = newfund
      funds.push(address(newfund));   
      fundstore[address(newfund)].name = _fname;
      fundstore[address(newfund)].description = _fdescription;
   }
   function getAllDeployedFunds() public view returns (address[] memory) {
      return funds;
   }
   
   function getDetailsOfFund(address  _fundaddress) public view returns (fundinfo memory)
   {
       return fundstore[_fundaddress];
   }
}