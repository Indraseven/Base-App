require('dotenv').config();
const { createWalletClient, createPublicClient, http, parseUnits } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { baseSepolia } = require('viem/chains');

// 🪙 ALAMAT TOKEN NST ANDA
const TOKEN_ADDRESS = "0x0464560513d85290daddab3f642b3814bd06ee11";

const abi = [
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function main() {
    // 1. Ambil Argumen dari Terminal
    const recipient = process.argv[2];
    const amountStr = process.argv[3];

    if (!recipient || !amountStr) {
        console.log("❌ Cara Pakai: node kirim_nst.js <ALAMAT_TUJUAN> <JUMLAH>");
        console.log("👉 Contoh: node kirim_nst.js 0x123...abc 100");
        return;
    }

    // 2. Setup Client
    const account = privateKeyToAccount(process.env.PRIVATE_KEY);
    const walletClient = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(process.env.RPC_URL)
    });
    const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(process.env.RPC_URL)
    });

    console.log(`💸 Mengirim ${amountStr} NST`);
    console.log(`📤 Dari: ${account.address}`);
    console.log(`📥 Ke  : ${recipient}`);

    try {
        // 3. Konversi Jumlah (ingat 18 desimal)
        const amountWei = parseUnits(amountStr, 18);

        // 4. Kirim Transaksi
        const hash = await walletClient.writeContract({
            address: TOKEN_ADDRESS,
            abi: abi,
            functionName: 'transfer',
            args: [recipient, amountWei]
        });

        console.log(`✅ Transaksi Terkirim! Hash: ${hash}`);
        console.log(`⏳ Menunggu konfirmasi blok...`);

        await publicClient.waitForTransactionReceipt({ hash });
        console.log(`🎉 SUKSES! ${amountStr} NST sudah berpindah tangan.`);

    } catch (error) {
        console.error("❌ Gagal:", error.message);
    }
}

main();

