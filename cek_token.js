require('dotenv').config();
const { createPublicClient, http, formatUnits } = require('viem');
const { baseSepolia } = require('viem/chains');

// 🪙 ALAMAT TOKEN ANDA (Dari Screenshot)
const TOKEN_ADDRESS = "0x0464560513d85290daddab3f642b3814bd06ee11";

// 🆔 ABI Standar ERC-20 (Hanya fungsi yang kita butuh)
const abi = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    }
];

async function main() {
    const client = createPublicClient({
        chain: baseSepolia,
        transport: http(process.env.RPC_URL)
    });

    // Ambil alamat wallet Anda dari .env (lewat private key)
    const { privateKeyToAccount } = require('viem/accounts');
    const account = privateKeyToAccount(process.env.PRIVATE_KEY);

    console.log(`🔍 Mengecek saldo di dompet: ${account.address}`);

    // 1. Cek Simbol Token
    const symbol = await client.readContract({
        address: TOKEN_ADDRESS, abi: abi, functionName: 'symbol'
    });

    // 2. Cek Saldo
    const balance = await client.readContract({
        address: TOKEN_ADDRESS,
        abi: abi,
        functionName: 'balanceOf',
        args: [account.address]
    });

    // Format (Ingat token punya 18 desimal)
    const formatted = formatUnits(balance, 18);

    console.log(`💰 SALDO ANDA: ${formatted} ${symbol}`);
    console.log(`   (Satu Juta ${symbol} siap diedarkan!)`);
}

main().catch(console.error);

