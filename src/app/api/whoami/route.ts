import { NextResponse, NextRequest } from 'next/server';
import { ethers, Wallet, Contract } from 'ethers';
import { AVALANCHE_TESTNET_RPC, CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/const';
import { extractPackagesWithVersions, getSerialNumber } from '@/lib/data_collector';

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

    const { address, userPrivateKey } = await req.json();
    if (!ethers.isAddress(address)) {
        console.error('Invalid User Address');
        return NextResponse.json({ error: 'Invalid Address' }, { status: 500 });
    }

    try {
        let signer = null;
        let signerAddress = 'N/A (No signer created for read-only)';

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

        const tx = await provider.getTransaction("0x30474c77d5f8a105e7cda268d8d8ee071936647403227fd22c80c1eeefca5acc")
        // @ts-ignore
        console.log("Transaction: "+ tx.data)

        const iface = new ethers.Interface(CONTRACT_ABI);

        // @ts-ignore
        if (!tx.data || tx.data === '0x') {
            console.log('La transacción no contiene datos');
            return;
        }

        try {
            // @ts-ignore
            const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });
            // @ts-ignore
            const name = decoded.name
            console.log('Nombre de la función:', name);
            // @ts-ignore
            const args = decoded.args;
            console.log('Argumentos:', args);
            // @ts-ignore

            return NextResponse.json({
                name,
                args,
            });
        } catch (error) {
            return NextResponse.json({error})
        }

    } catch (err: any) {
        console.error('Error checking roles:', err);
        return NextResponse.json({
            error: 'Failed to read contract state',
            details: err.message || err.toString()
        }, { status: 500 });
    }
}
