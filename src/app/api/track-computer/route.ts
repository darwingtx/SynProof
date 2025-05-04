import { NextResponse, NextRequest } from 'next/server';
import { ethers, Wallet, Contract } from 'ethers';
import { AVALANCHE_TESTNET_RPC, CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/const';
import { extractPackagesWithVersions } from '@/lib/data_collector';

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

    try {
        let signer = null;
        let signerAddress = 'N/A (No signer created for read-only)';

				const {
					userPrivateKey
				} = await req.json();

        if (userPrivateKey) {
             signer = new Wallet(userPrivateKey, provider);
             signerAddress = signer.address;
             console.log(`Using signer address: ${signerAddress}`);
        } else {
            console.log("PRIVATE_KEY not found in env, connecting in read-only mode.");
        }

        const computerTrackerContract = new Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
						signer ?? provider
        );

        const connectedAddress = await computerTrackerContract.getAddress(); // ethers v6+
        console.log(`Successfully created contract instance for address: ${connectedAddress}`);
        console.log('Attempting to call trackComputer with:', userPrivateKey);

				const extractedData = await extractPackagesWithVersions()

				const blockData = {
					blockdata: JSON.stringify(extractedData),
					numSerie: "NHQ59AL00H9480D4F83401",
					timestamp: 100000000000000
				}

        const tx = await computerTrackerContract.trackComputer(blockData);

        console.log(`Transaction sent! Hash: ${tx.hash}`);
        console.log(`Waiting for transaction confirmation...`);

        const receipt = await tx.wait(1);
        console.log(`Transaction confirmed! Block number: ${receipt?.blockNumber}`);

        return NextResponse.json({
            message: 'Computer successfully tracked and added to the contract.',
            transactionHash: receipt?.hash,
            blockNumber: receipt?.blockNumber,
						extractedData
        })
    } catch (err: any) {
        console.error('Error connecting to contract:', err);
        let errorMessage = 'Error connecting to the smart contract.';
        if (err.message) {
            errorMessage = `Error: ${err.message}`;
        }

        return NextResponse.json({ error: errorMessage, details: err.toString() }, { status: 500 });
    }
}
