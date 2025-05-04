import { NextResponse, NextRequest } from 'next/server';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_TESTNET_RPC);

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
