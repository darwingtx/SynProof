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

        const tx = await provider.getTransaction("0xba6996eecf4b3378c482d8cf2e01120547fc2758ea5c3e45c05240744d50cafe")
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
            console.log('Nombre de la función:', decoded.name);
            // @ts-ignore
            console.log('Argumentos:', decoded.args);
        } catch (error) {
            console.error('Error al decodificar:', error);
        }

        return NextResponse.json({
            address: address,

            serial_number: await getSerialNumber(),
        })
    } catch (err: any) {
        console.error('Error checking roles:', err);
        return NextResponse.json({
            error: 'Failed to read contract state',
            details: err.message || err.toString()
        }, { status: 500 });
    }
}
