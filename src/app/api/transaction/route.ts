import { NextResponse, NextRequest } from 'next/server';
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_TESTNET_RPC);

export async function POST(req: NextRequest, res: NextResponse) {
    const { address, to, tokens } = await req.json();
    if (!ethers.isAddress(address)) {
        return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
    }

    try {
        const key = process.env.PRIVATE_KEY;
        if (key == undefined) return NextResponse.json({ error: 'Transaction error' }, { status: 500 })
        console.log("Private key: "+key);
        const signer = new ethers.Wallet(key, provider)
        const tx = await signer.sendTransaction({
            to,
            value: ethers.parseUnits(tokens, 'ether')
        });
        return NextResponse.json({
            status: 400,
            tx
        });
    } catch (err) {
        return NextResponse.json({ error: 'Transaction error', err }, { status: 500 })
    }
}




