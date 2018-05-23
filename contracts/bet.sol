pragma solidity ^0.4.18;


contract ERC721Abstract
{
	function implementsERC721() public pure returns (bool);
	function balanceOf(address _owner) public view returns (uint256 balance);
	function ownerOf(uint256 _tokenId) public view returns (address owner);
	function approve(address _to, uint256 _tokenId) public;
	function transferFrom(address _from, address _to, uint256 _tokenId) public;
	function transfer(address _to, uint256 _tokenId) public;
 
	event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
	event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

	// Optional
	// function totalSupply() public view returns (uint256 total);
	// function name() public view returns (string name);
	// function symbol() public view returns (string symbol);
	// function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256 tokenId);
	// function tokenMetadata(uint256 _tokenId) public view returns (string infoUrl);
}

contract ERC721 is ERC721Abstract
{
	string constant public   name = "Ducatur Betting Service";
	string constant public symbol = "DBS";

	uint256 public totalSupply;
	struct Token
	{
		uint256 price;			//  value of stake
		uint256	option;			//  [payout]96[idBetting]64[combination]32[dateBuy]0
		                        //  [payout]96[rateFrom]64[rateTo]32[dateBuy]0
		//uint8 betType;             //  1- bull 0 - bear
	}
	mapping (uint256 => Token) tokens;
	
	// A mapping from tokens IDs to the address that owns them. All tokens have some valid owner address
	mapping (uint256 => address) public tokenIndexToOwner;
	
	// A mapping from owner address to count of tokens that address owns.	
	mapping (address => uint256) ownershipTokenCount; 

	// A mapping from tokenIDs to an address that has been approved to call transferFrom().
	// Each token can only have one approved address for transfer at any time.
	// A zero value means no approval is outstanding.
	mapping (uint256 => address) public tokenIndexToApproved;
	
	function implementsERC721() public pure returns (bool)
	{
		return true;
	}

	function balanceOf(address _owner) public view returns (uint256 count) 
	{
		return ownershipTokenCount[_owner];
	}
	
	function ownerOf(uint256 _tokenId) public view returns (address owner)
	{
		owner = tokenIndexToOwner[_tokenId];
		require(owner != address(0));
	}
	
	// Marks an address as being approved for transferFrom(), overwriting any previous approval. 
	// Setting _approved to address(0) clears all transfer approval.
	function _approve(uint256 _tokenId, address _approved) internal 
	{
		tokenIndexToApproved[_tokenId] = _approved;
	}
	
	// Checks if a given address currently has transferApproval for a particular token.
	// param _claimant the address we are confirming token is approved for.
	// param _tokenId token id, only valid when > 0
	function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
		return tokenIndexToApproved[_tokenId] == _claimant;
	}
	
	function approve( address _to, uint256 _tokenId ) public
	{
		// Only an owner can grant transfer approval.
		require(_owns(msg.sender, _tokenId));

		// Register the approval (replacing any previous approval).
		_approve(_tokenId, _to);

		// Emit approval event.
		Approval(msg.sender, _to, _tokenId);
	}
	
	function transferFrom( address _from, address _to, uint256 _tokenId ) public
	{
		// Check for approval and valid ownership
		require(_approvedFor(msg.sender, _tokenId));
		require(_owns(_from, _tokenId));

		// Reassign ownership (also clears pending approvals and emits Transfer event).
		_transfer(_from, _to, _tokenId);
	}
	
	function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
		return tokenIndexToOwner[_tokenId] == _claimant;
	}
	
	function _transfer(address _from, address _to, uint256 _tokenId) internal 
	{
		ownershipTokenCount[_to]++;
		tokenIndexToOwner[_tokenId] = _to;

		if (_from != address(0)) 
		{
			Transfer(_from, _to, _tokenId);
			ownershipTokenCount[_from]--;
			// clear any previously approved ownership exchange
			delete tokenIndexToApproved[_tokenId];
		}

	}
	
	function transfer(address _to, uint256 _tokenId) public
	{
		require(_to != address(0));
		require(_owns(msg.sender, _tokenId));
		_transfer(msg.sender, _to, _tokenId);
	}

}

contract Owned 
{
    address private candidate;
	address public owner;

	mapping(address => bool) public admins;
	
    function Owned() public 
	{
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public 
	{
		require(msg.sender == owner);
        candidate = newOwner;
    }
	
	function confirmOwner() public 
	{
        require(candidate == msg.sender); // run by name=candidate
		owner = candidate;
    }
	
    function addAdmin(address addr) external 
	{
		require(msg.sender == owner);
        admins[addr] = true;
    }

    function removeAdmin(address addr) external
	{
		require(msg.sender == owner);
        admins[addr] = false;
    }
}

contract Functional
{
	// parseInt(parseFloat*10^_b)
	function parseInt(string _a, uint _b) internal pure returns (uint) 
	{
		bytes memory bresult = bytes(_a);
		uint mint = 0;
		bool decimals = false;
		for (uint i=0; i<bresult.length; i++){
			if ((bresult[i] >= 48)&&(bresult[i] <= 57)){
				if (decimals){
				   if (_b == 0) break;
					else _b--;
				}
				mint *= 10;
				mint += uint(bresult[i]) - 48;
			} else if (bresult[i] == 46) decimals = true;
		}
		if (_b > 0) mint *= 10**_b;
		return mint;
	}
	
	function uint2str(uint i) internal pure returns (string)
	{
		if (i == 0) return "0";
		uint j = i;
		uint len;
		while (j != 0){
			len++;
			j /= 10;
		}
		bytes memory bstr = new bytes(len);
		uint k = len - 1;
		while (i != 0){
			bstr[k--] = byte(48 + i % 10);
			i /= 10;
		}
		return string(bstr);
	}
	
	function strConcat(string _a, string _b, string _c) internal pure returns (string)
	{
		bytes memory _ba = bytes(_a);
		bytes memory _bb = bytes(_b);
		bytes memory _bc = bytes(_c);
		string memory abc;
		uint k = 0;
		uint i;
		bytes memory babc;
		if (_ba.length==0)
		{
			abc = new string(_bc.length);
			babc = bytes(abc);
		}
		else
		{
			abc = new string(_ba.length + _bb.length+ _bc.length);
			babc = bytes(abc);
			for (i = 0; i < _ba.length; i++) babc[k++] = _ba[i];
			for (i = 0; i < _bb.length; i++) babc[k++] = _bb[i];
		}
        for (i = 0; i < _bc.length; i++) babc[k++] = _bc[i];
		return string(babc);
	}
	
	function timenow() public view returns(uint32) { return uint32(block.timestamp); }
}

contract CSBetting is ERC721, Functional, Owned
{
	uint256 public feeBetting;
	
	enum Status {
		NOTFOUND,		//0 game not created
		PLAYING,		//1 buying tickets
		PROCESSING,		//2 waiting for result
		PAYING,	 		//3 redeeming
		CANCELING		//4 canceling the game
	}
	
	struct Game {
		//string  nameBetting;
		uint32  countCombinations;
		uint32  dateStopBuy;
		uint32  minStake;				// per finney = 0.001E
		//uint32  winCombination;
		uint256 rate;                 // win val delivered by orcale
		uint256 betsSumIn;				// amount bets
		uint256 feeValue;				// amount fee
		Status status;					// status of game
		uint256 startTokenId;
		bool isFreezing;
	}
	
	Game[] private game;
	
	uint256 public  curRate  = 0;
	uint32  private lastTo = 0;
	uint256 public  allWin = 0;
	
	struct Stake {
		uint256 sum;		// amount bets
		uint32 count;		// count bets 
	}
	
	
	mapping(uint32 => Stake) public betsAll; // ID-Betting => Stake
	mapping(bytes32 => uint32) private queryRes;  // ID-query => ID-Betting
	
	//uint256 public ORACLIZE_GAS_LIMIT = 200000;
	//uint256 public ORACLIZE_GASPRICE_GWEY = 40; // 40Gwey
	
    address constant public oracleAddress = 0x1979c2a9d21f9f8ffb73f0a81ce9823c4f306eaf;

	event LogEvent(string _event, uint256 value);
	event LogToken(string _event, address user, uint32 idBetting, uint32 idToken, uint32 betFrom, uint32 betTo, uint256 amount);
    event LogOracle(string _event, uint256 _ex1, uint256 _ex2, uint256 _ex3, uint256 _ex4, uint256 _ex5, uint256 _exD, uint256 _exAvg);
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
	
	modifier onlyAdmin {
        require(msg.sender == owner || admins[msg.sender]);
        _;
    }

	modifier onlyOracle {
        require (msg.sender == oracleAddress);
        _;
    }

	function getBettingByID(uint32 _id) public view returns (
		//string  nameBetting,
		uint32 countCombinations,
		uint32 dateStopBuy,
		uint32 minStake,
		uint256 startTokenId,
		uint32 betsCount,
		uint256 betsSumIn,
		uint256 feeValue,
		Status status,
		bool isFreezing
	){
		Game storage gm = game[_id];
		//nameBetting = gm.nameBetting;
		countCombinations = gm.countCombinations;
		dateStopBuy = gm.dateStopBuy;
		minStake = gm.minStake;
		startTokenId = gm.startTokenId;
		betsCount = betsAll[_id].count;
		betsSumIn = gm.betsSumIn;  
		if (betsSumIn==0) betsSumIn =  betsAll[_id].sum;
		feeValue = gm.feeValue;
		status = gm.status;
		if ( status == Status.PLAYING && timenow() > dateStopBuy ) status = Status.PROCESSING;
		isFreezing = gm.isFreezing;
	}
	/*
	function getCountTokensByBetting(uint32 idBetting) internal view returns (uint32)
	{
		Game storage curGame = game[idBetting];
		uint32 count = 0;
		for(uint32 i=1;i<=curGame.countCombinations;i++) count += betsAll[idBetting][i].count;
		return count;
	}
	*/
	/*
	function getSumInByBetting(uint32 idBetting) internal view returns (uint256)
	{
		Game storage curGame = game[idBetting];
		uint256 sum = 0;
		for(uint32 i=1;i<=curGame.countCombinations;i++) sum += betsAll[idBetting][i].sum;
		return sum;
	}
	*/
	function getTokenByID(uint256 _id) public view returns ( 
			uint256 price,
			uint256 payment,
			uint32 betFrom,
			uint32 betTo,
			//uint32 betType,
			uint32 dateBuy,
			uint32 idBetting,
			address ownerToken,
			bool payout
	){
		Token storage tkn = tokens[_id];

		price = tkn.price;
		
		uint256 packed = tkn.option;
		payout = uint8((packed >> (12*8)) & 0xFF)==1?true:false;
		idBetting = 0;
		betFrom   = uint32((packed >> (8*8)) & 0xFFFFFFFF);
		betTo = uint32((packed >> (4*8)) & 0xFFFFFFFF);
		dateBuy     = uint32(packed & 0xFFFFFFFF);

		payment = 0;
		Game storage curGame = game[idBetting];
		
		uint256 betsSumIn = curGame.betsSumIn;  
		//if (betsSumIn==0) betsSumIn =  betsAll[_id].sum;
        
        payment = tkn.price;
        //betType = tkn.betType;
		//if (curGame.winCombination==combination) payment = betsSumIn * tkn.price / betsAll[idBetting][ curGame.winCombination ].sum;
		//if (curGame.status == Status.CANCELING) payment = tkn.price;
		
		ownerToken = tokenIndexToOwner[_id];
	}

	function getUserTokens(address user, uint32 count) public view returns ( string res ) 
	{
		res="";
		require(user!=0x0);
		uint32 findCount=0;
		for (uint256 i = totalSupply-1; i >= 0; i--)
		{
			if(i>totalSupply) break;
			if (user == tokenIndexToOwner[i]) 
			{
				res = strConcat( res, ",", uint2str(i) );
				findCount++;
				if (count!=0 && findCount>=count) break;
			}
		}
	}

	function getStat() public view returns ( 
			uint32 countAll,
			uint32 countPlaying,
			uint32 countProcessing,
			string listPlaying,
			string listProcessing
	){
		countAll = uint32(game.length);
		countPlaying = 0;
		countProcessing = 0;
		listPlaying="";
		//listProcessing="";
		uint32 curtime = timenow();
		for (uint32 i = 0; i < countAll; i++)
		{
			if (game[i].status!=Status.PLAYING) continue;
			if (curtime <  game[i].dateStopBuy) { countPlaying++; listPlaying = strConcat( listPlaying, ",", uint2str(i) ); }
			if (curtime >= game[i].dateStopBuy) { countProcessing++; listProcessing = strConcat( listProcessing, ",", uint2str(i) ); }
			//countPlaying++; listPlaying = strConcat( listPlaying, ",", uint2str(i) );
		}
		
	}

	function CSBetting() public 
	{
	    //what too need for init  ??? todo
	}


	function freezeBetting(uint32 idBetting, bool freeze) public onlyAdmin 
	{ 
		Game storage curGame = game[idBetting];
		require( curGame.isFreezing != freeze );
		curGame.isFreezing = freeze; 
	}

	function addBetting( uint32 _minStakeFinney, uint256 _rate ) onlyAdmin public //string _nameBetting, uint32 _dateStopBuy, uint32 _countCombinations, 
	{
		//require( bytes(_nameBetting).length > 2 );
		//require( _countCombinations > 1 );
		require( _minStakeFinney > 0 );
		//require( _dateStopBuy > timenow() );

		Game memory _game;
		//_game.nameBetting = _nameBetting;
		_game.countCombinations = 20;
		_game.dateStopBuy = timenow() + 30 days; //_dateStopBuy; ??? 
		_game.minStake 	= _minStakeFinney;
		curRate = _rate;
		_game.status = Status.PLAYING;
		_game.startTokenId = totalSupply ;

		uint256 newGameId = game.push(_game) - 1;
		
		LogEvent( "AddGame", newGameId );
	}

	function () payable public { require (msg.value == 0x0); }
	
	function buyToken(uint32 betFrom, uint32 betTo) payable public //  //address captainAddress
	{
	    //temp 
	    uint32 idBetting = 0;
		Game storage curGame = game[idBetting];
		require( curGame.status == Status.PLAYING );
		require( timenow() < curGame.dateStopBuy );
		//require( combination > 0 && combination <= curGame.countCombinations );
		//require( captainAddress != msg.sender );
		require( curGame.isFreezing == false );
		
		// check money for stake
		require( msg.value >= curGame.minStake * 1 finney );
		
		uint256 userStake = msg.value;
		uint256 feeValue = userStake * 5 / 100;		// 5% fee for contract
		userStake = userStake - feeValue;
		
		/* if (captainAddress!=0x0)  
		{
			uint256 captainValue = feeValue * 20 / 100;		// bonus for captain = 1%
			feeValue = feeValue - captainValue;
			require(feeValue + captainValue + userStake == msg.value);
			captainAddress.transfer(captainValue);
		} */

		curGame.feeValue  = curGame.feeValue + feeValue;
		
		betsAll[idBetting].sum += userStake;
		betsAll[idBetting].count += 1; 

		uint128 packed;
		packed = ( uint128(betFrom) << 8*8 ) + ( uint128(betTo) << 4*8 ) + uint128(block.timestamp);

		Token memory _token = Token({
			price: userStake,
			option : packed
		});

		uint256 newTokenId = totalSupply++;
		tokens[newTokenId] = _token;
		_transfer(0, msg.sender, newTokenId);
		LogToken( "Buy", msg.sender, idBetting, uint32(newTokenId), betFrom, betTo, userStake);
	}
	//change status before and after calculating wins
	function endGame() public onlyOwner {
	    if (game[0].status == Status.PROCESSING) game[0].status = Status.PAYING ;
	    if (game[0].status == Status.PLAYING) game[0].status = Status.PROCESSING ;
	    //allWin = calcWinners();
	    
	}
	//calculate win && lose bets, change status to PAYING
	function getCurrentWinStake() public view returns 
	( uint256 winSum
	) {
	    winSum = 0;
	    for (uint32 i = 0 ; i < totalSupply; i++) 
	        if (uint32((tokens[i].option >> (8*8)) & 0xFFFFFFFF) <= uint32(curRate) &&  //betFrom
	            uint32((tokens[i].option >> (4*8)) & 0xFFFFFFFF) >= uint32(curRate) )   //betTo
	            winSum = winSum + tokens[i].price; 
	    
	}
	
	function calcWinners(uint32 _to) public { // only Oracle 
	    require( game[0].status == Status.PROCESSING );
	    require( lastTo < totalSupply );
	    for ( uint32 i = lastTo; i < _to; i++ )
	        if (uint32((tokens[i].option >> (8*8)) & 0xFFFFFFFF) <= uint32(curRate) &&  //betFrom
	            uint32((tokens[i].option >> (4*8)) & 0xFFFFFFFF) >= uint32(curRate) )   //betTo
	            allWin = allWin + tokens[i].price;
	    if ( totalSupply <= _to ) endGame();
	    else lastTo = _to;
	    
	}
	
	// take win money or money for canceling Betting
	function redeemToken(uint32 _tokenId) public
	{

	    uint256 packed = tokens[_tokenId].option;
		bool payout = uint8((packed >> (12*8)) & 0xFF)==1?true:false;
        //legacy architecture 
		Game storage curGame = game[0];
		
		require( curGame.status == Status.PAYING || curGame.status == Status.CANCELING);

		require( msg.sender == tokenIndexToOwner[_tokenId] );	// only onwer`s token
		require( payout == false ); // has not paid

		uint256 sumPayment = 0;

		if ( game[0].status == Status.CANCELING ) sumPayment = tokens[_tokenId].price;
		if ( game[0].status == Status.PAYING && 
		        uint32((tokens[_tokenId].option >> (8*8)) & 0xFFFFFFFF) <= uint32(curRate) &&  //betFrom
	            uint32((tokens[_tokenId].option >> (4*8)) & 0xFFFFFFFF) >= uint32(curRate)) sumPayment =  betsAll[0].sum * allWin / tokens[_tokenId].price;   //curGame.betsSumIn * tkn.price / betsAll[idBetting][curGame.winCombination].sum;
        require( sumPayment != 0 ); 
	    payout = true;
		tokens[_tokenId].option += uint128(payout?1:0) << 12*8; //change to payout
	
		msg.sender.transfer(sumPayment);
		
		//LogToken( "Redeem", msg.sender, idBetting, uint32(_tokenId), tkn.betType, betVal, sumPayment);
	}
	
	// ???
	
	function cancelBetting(uint32 idBetting) public 
	{
		Game storage curGame = game[idBetting];
		
		require( curGame.status == Status.PLAYING );
		// only owner/admin or anybody after 7 days
		require( msg.sender == owner || admins[msg.sender] || timenow() > curGame.dateStopBuy + 7 * 24*60*60 );

		curGame.status = Status.CANCELING;

		LogEvent( "CancelBetting", idBetting );
		
		//takeFee(idBetting);
	}
	
	function setRate(uint256 _ex1, uint256 _ex2, uint256 _ex3, uint256 _ex4, uint256 _ex5, uint256 _exD, uint256 _exAvg) onlyOracle {
	    curRate = _exAvg;
	    LogOracle("newPrice", _ex1, _ex2, _ex3, _ex4, _ex5, _exD, _exAvg);
	}
	
/*
	function takeFee(uint32 idBetting) internal
	{
		Game storage curGame = game[idBetting];
		
		// take fee
		if ( curGame.feeValue > 0 )
		{
			feeBetting = feeBetting + curGame.feeValue;
			LogEvent( "TakeFee", curGame.feeValue );
		}
	}
*/	
	function withdraw() onlyOwner public
	{
		require( feeBetting > 0 );

		uint256 tmpFeeBetting = feeBetting;
		feeBetting = 0;
		
		owner.transfer(tmpFeeBetting);
		LogEvent( "WITHDRAW", tmpFeeBetting);
	}

}