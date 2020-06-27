pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./SafeMath.sol";

/**
* @title paardarshak
* @author Abhishek Vispute
*/
contract paardarshak {
   using SafeMath for uint256;
    address owner;
  
     modifier onlyowner
     {
         require(msg.sender==owner,"You are not allowed");
         _;
     }
   
   bytes32 d;
   
     struct fundinfo {
       string name;
       string description;
   }

   fundinfo f;
   struct SingleInstanceOfHistory {
       uint256 value;
       uint32 typeOfOwner;
       string nameOfOwner;
       string purpose;
       address _owner;
       bytes32 childtoken;
   }    

   struct token {
       
       SingleInstanceOfHistory []  CompleteHistoryOfToken  ;
      
   }
   mapping (bytes32 => token) donations;
   bytes32 [] tokenkeys;

    // this thing can be offloaed to centrlized database, its ineffcient to use it on blockchain
   struct authority{
       string name;
       bool status;
   }
   mapping (address => authority) AuthoritiesNames;
   address [] listedAuthorities;

    constructor(string memory _fname, string memory _fdesc, address _owner)public{
        owner = _owner;
        AuthoritiesNames[owner].name = 'Root';
        AuthoritiesNames[owner].status = true;
        listedAuthorities.push(owner);
        f.name = _fname;
        f.description = _fdesc;
        
    }
   

   
   function createToken(bytes32 _key, uint256 _value, string memory _name) public
   {
      //we have to add oracle here to ckeck if payment is done, if not added anyone can call this function and can create their token
      
       donations[_key].CompleteHistoryOfToken.push(SingleInstanceOfHistory(
            _value,0,_name,'root',owner,d
        ));
  
       tokenkeys.push(_key);
    
   }
   
  function breakToken(bytes32 _key,uint256 _valueofparenttoken, bytes32 _childkey) public
  {
       
       uint256 temp = donations[_key].CompleteHistoryOfToken.length-1;
       
       require(donations[_key].CompleteHistoryOfToken[temp]._owner==msg.sender, "You are not owner of this token");
       require(donations[_key].CompleteHistoryOfToken[temp].value> _valueofparenttoken);
       uint256 valueofchildtoken = donations[_key].CompleteHistoryOfToken[temp].value - _valueofparenttoken;
       
        donations[_key].CompleteHistoryOfToken.push(SingleInstanceOfHistory(
           _valueofparenttoken,
            1,
            donations[_key].CompleteHistoryOfToken[temp].nameOfOwner, 
            donations[_key].CompleteHistoryOfToken[temp].purpose,
            donations[_key].CompleteHistoryOfToken[temp]._owner,
            _childkey ));
       
        donations[_childkey].CompleteHistoryOfToken.push(SingleInstanceOfHistory(
            valueofchildtoken,
            1,
            donations[_key].CompleteHistoryOfToken[temp].nameOfOwner, 
            donations[_key].CompleteHistoryOfToken[temp].purpose,
            donations[_key].CompleteHistoryOfToken[temp]._owner,
            d
        ));
  
       tokenkeys.push(_childkey);
       
  }
   
   function transferToken(bytes32 _key, uint8 _typeOfOwner, string memory _nextOwnername, string memory _purpose, address _nextOwner) public
   {
       require(donations[_key].CompleteHistoryOfToken[donations[_key].CompleteHistoryOfToken.length-1]._owner==msg.sender, "You are not owner of this token");
       require(_nextOwner !=msg.sender, "You cannot send token to youeself");
       uint256 temp = donations[_key].CompleteHistoryOfToken.length-1;
       donations[_key].CompleteHistoryOfToken.push(SingleInstanceOfHistory(
           donations[_key].CompleteHistoryOfToken[temp].value,
            _typeOfOwner, _nextOwnername, _purpose,_nextOwner, donations[_key].CompleteHistoryOfToken[temp].childtoken ));
       //emit TokensSent(msg.sender, _to, _amount);
   }
   
    function donate(bytes32 _key, uint256 _value, string calldata _name) external payable{
         donations[_key].CompleteHistoryOfToken.push(SingleInstanceOfHistory(
            _value,0,_name,'root',owner,d
        ));
  
        tokenkeys.push(_key);
       
    }

//      function donate() external payable{
        
       
//   }
   
   function paymentToLeaf(bytes32 _key, address payable _add, string memory _name, string memory _purpose) public payable{
        require(donations[_key].CompleteHistoryOfToken[donations[_key].CompleteHistoryOfToken.length-1]._owner==msg.sender, "You are not owner of this token");
        
       _add.transfer(msg.value);
        uint256 temp = donations[_key].CompleteHistoryOfToken.length-1;
        donations[_key].CompleteHistoryOfToken.push(SingleInstanceOfHistory(
            msg.value,2,_name,_purpose,_add, donations[_key].CompleteHistoryOfToken[temp].childtoken
        ));
   } 
   
   function getSingleTokenDetails(bytes32 _key) public view returns (token memory)
   {
       return donations[_key];
   }

   function getAllTokenKeys() public view returns (bytes32 [] memory)
   {
       return tokenkeys;
   }
   
   function addAuthority(string memory _childname, address _add) public
   {
       require(AuthoritiesNames[msg.sender].status == true, "You are not a authority");
       AuthoritiesNames[_add].name = _childname;
       AuthoritiesNames[_add].status = true;
       listedAuthorities.push(_add);
       
   }
   
    
   function getSingleAuthDetails(address _add) public view returns (authority memory)
   {
       return AuthoritiesNames[_add];
   }

   function getAllListedAuthAddress() public view returns (address [] memory)
   {
       return listedAuthorities;
   }
   
   
   function getFundInfo() public view returns (fundinfo memory)
   {
       return f;
   }

    function destroySmartContract(address payable _to) public onlyowner {
        selfdestruct(_to);
    }
}