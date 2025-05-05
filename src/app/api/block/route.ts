import { NextResponse, NextRequest } from 'next/server';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_TESTNET_RPC);

export async function POST(req: NextRequest) {
    const { from, to } = await req.json();

    try {
        const blocks = [];
        for (let blockNumber = from; blockNumber <= to; blockNumber++) {
            const block = await provider.getBlock(blockNumber);
            if (block == null) break;
            blocks.push(block.toJSON());
        }
        return NextResponse.json({blocks})
    } catch (err) {
        return NextResponse.json({ error: 'Error getting the balance' }, { status: 500 })
    }
}
