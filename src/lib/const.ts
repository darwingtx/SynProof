export const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "adminAddress",
				"type": "address"
			}
		],
		"name": "AdminAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "adminAddress",
				"type": "address"
			}
		],
		"name": "AdminDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "numSerie",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ComputerTracked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "numSerie",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "numSerie",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserDeleted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "computers",
		"outputs": [
			{
				"internalType": "string",
				"name": "blockdata",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "numSerie",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adminAddress",
				"type": "address"
			}
		],
		"name": "deleteAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "numSerie",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					}
				],
				"internalType": "struct ComputerTracker.User",
				"name": "data",
				"type": "tuple"
			}
		],
		"name": "deleteUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getComputers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "blockdata",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "numSerie",
						"type": "string"
					}, {
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct ComputerTracker.Computer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adminAddress",
				"type": "address"
			}
		],
		"name": "putAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "numSerie",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					}
				],
				"internalType": "struct ComputerTracker.User",
				"name": "data",
				"type": "tuple"
			}
		],
		"name": "putUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "blockdata",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "numSerie",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct ComputerTracker.Computer",
				"name": "data",
				"type": "tuple"
			}
		],
		"name": "trackComputer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const AVALANCHE_TESTNET_RPC = 'https://upgraded-cod-4r69pgrg747cjggx-9652.app.github.dev/ext/bc/2LJMzE6uWXeCVYr9Z1U44Ci2AX56JuZgYPonrt43p2vTY3FMs9/rpc';
export const SUPERADMIN_PRIVATE_KEY = "915f4c540d456a6d766ce5971b317e886bf5176da68bfb1eb0c1779ff0e9f468";
export const CONTRACT_ADDRESS = "0x1beb0CC4BD220C991D7fE20B130b10279e3bCE1a";

