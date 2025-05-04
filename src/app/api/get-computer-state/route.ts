import { NextResponse, NextRequest } from 'next/server';
import { ethers, Wallet, Contract } from 'ethers';

const AVALANCHE_TESTNET_RPC = 'https://upgraded-cod-4r69pgrg747cjggx-9652.app.github.dev/ext/bc/2LJMzE6uWXeCVYr9Z1U44Ci2AX56JuZgYPonrt43p2vTY3FMs9/rpc';
const PRIVATE_KEY = "915f4c540d456a6d766ce5971b317e886bf5176da68bfb1eb0c1779ff0e9f468";
// personal
//const PRIVATE_KEY = "bf1b49d08781d6ad2e5bce017360cdd3b05580fe89fced3f0eb005e4082b2fdd";
const CONTRACT_ADDRESS = "0x1beb0CC4BD220C991D7fE20B130b10279e3bCE1a";

const CONTRACT_ABI = [
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

const provider = new ethers.JsonRpcProvider(AVALANCHE_TESTNET_RPC);

export async function POST(req: NextRequest) {
    if (!CONTRACT_ADDRESS) {
        console.error('NEXT_PUBLIC_COMPUTER_TRACKER_CONTRACT_ADDRESS environment variable not set.');
        return NextResponse.json({ error: 'Server configuration error: Missing contract address' }, { status: 500 });
    }
    if (!ethers.isAddress(CONTRACT_ADDRESS)) {
        console.error('Invalid Contract Address:', CONTRACT_ADDRESS);
        return NextResponse.json({ error: 'Server configuration error: Invalid contract address' }, { status: 500 });
    }
    if (!CONTRACT_ABI || CONTRACT_ABI.length < 5) { 
        console.error('CONTRACT_ABI is not set or seems incomplete.');
        return NextResponse.json({ error: 'Server configuration error: Missing or incomplete contract ABI' }, { status: 500 });
    }

    try {
        let signer = null;
        let signerAddress = 'N/A (No signer created for read-only)';
        if (PRIVATE_KEY) {
             signer = new Wallet(PRIVATE_KEY, provider);
             signerAddress = signer.address;
             console.log(`Using signer address: ${signerAddress}`);
        } else {
            console.log("PRIVATE_KEY not found in env, connecting in read-only mode.");
        }

        // --- Instantiate Contract (The "Connection") ---
        // This uses the contract address, the ABI you provided, and connects
        // via the signer (if available) or provider (for read-only).
        const computerTrackerContract = new Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer ?? provider // Use signer if available, otherwise provider
        );

        const connectedAddress = await computerTrackerContract.getAddress(); // ethers v6+
        // const connectedAddress = computerTrackerContract.address; // ethers v5
        console.log(`Successfully created contract instance for address: ${connectedAddress}`);

        // --- Prepare Data for putUser ---
        // The function expects one argument: a struct (User).
        // Ethers.js accepts a JavaScript object matching the struct fields.
        const userData = '0x21B89B9E4F2E3031332fb69E67e1E5ebBbB4d279'
        console.log('Attempting to call putUser with:', userData);

        // --- Send the Transaction ---
        // IMPORTANT: This assumes the signer IS an admin on the contract!
        const tx = await computerTrackerContract.putAdmin(userData);

        console.log(`Transaction sent! Hash: ${tx.hash}`);
        console.log(`Waiting for transaction confirmation...`);

        // --- Wait for Confirmation ---
        const receipt = await tx.wait(1); // Wait for 1 confirmation
        console.log(`Transaction confirmed! Block number: ${receipt?.blockNumber}`);

        // --- Return Success Response ---
        return NextResponse.json({
            message: 'User successfully added to the contract.',
            transactionHash: receipt?.hash,
            blockNumber: receipt?.blockNumber,
            addedUser: userData
        });


    } catch (err: any) {
        console.error('Error connecting to contract:', err);
        let errorMessage = 'Error connecting to the smart contract.';
        if (err.message) {
            errorMessage = `Error: ${err.message}`;
        }

        return NextResponse.json({ error: errorMessage, details: err.toString() }, { status: 500 });
    }
}
