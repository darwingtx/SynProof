import { NextResponse, NextRequest } from 'next/server';
import { ethers } from 'ethers';

const AVALANCHE_TESTNET_RPC = 'https://api.avax-test.network/ext/bc/C/rpc';
const provider = new ethers.JsonRpcProvider(AVALANCHE_TESTNET_RPC);

export async function POST(req: NextRequest, res: NextResponse) {
    const { address } = await req.json();
    if (!ethers.isAddress(address)) {
        return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
    }

    try {
        const balance = await provider.getBalance(address);
        const readable = ethers.formatEther(balance);
        return NextResponse.json({ balance: readable });
    } catch (err) {
        return NextResponse.json({ error: 'Error getting the balance' }, { status: 500 })
    }
}
