# 🇮🇩 Nusantara Fusion (Base-App)

**Nusantara Fusion** adalah proyek eksperimen Smart Contract yang dibangun dan di-deploy sepenuhnya melalui lingkungan mobile terminal (**Termux**) ke jaringan **Base Sepolia**.

Proyek ini mendemonstrasikan kemampuan *Mobile-First Web3 Engineering* tanpa bergantung pada IDE desktop berat.

---

## 🛠 Tech Stack

* **Runtime:** Node.js v20 (via Termux/Ubuntu PRoot)
* **Library:** Viem (TypeScript Interface for Ethereum)
* **Compiler:** Solc (Solidity Compiler)
* **Network:** Base Sepolia Testnet
* **Provider:** Coinbase Developer Platform (CDP)

## 🚀 Deployment Status

| Contract | Address | Status |
|----------|---------|--------|
| **SapaNusantara** | `0x75c83CA4FB792D082C435E09F2b175439EFaD38a` | ✅ Live |

*(Pastikan alamat di atas sesuai dengan hasil deploy Anda)*

## 📦 Cara Menjalankan (Local Termux)

1. **Clone Repository**
   ```bash
   git clone [https://github.com/Indraseven/Base-App.git](https://github.com/Indraseven/Base-App.git)
   cd Base-App
 
2. **Instal Dependensi**
   ```bash
   npm install

3. Setup Environment
   Buat file .env dan masukkan:
   ```bash
   PRIVATE_KEY=your_private_key_here
   RPC_URL=your_coinbase_rpc_url

4. Run Scripts
​   • Cek Koneksi: node cek_koneksi.js
​   • Baca Kontrak: node baca_kontrak.js
​   • Ubah Pesan: node ubah_pesan.js

​Created by Indraseven.eth


