// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NusantaraToken is ERC20, Ownable {
    // Constructor: Menentukan Nama, Simbol, dan Suplai Awal
    constructor() ERC20("Nusantara Token", "NST") Ownable(msg.sender) {
        // Cetak 1 Juta Token (dikali 10^18 desimal)
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Fungsi tambahan: Owner bisa mencetak lagi di masa depan
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

