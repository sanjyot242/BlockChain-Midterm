# CryptoZombies DApp - Midterm Project

## Team Members
- **Sumit Rodrigues** - 885164426 - sumit.rodrigues@csu.fullerton.edu
- **Sanjyot Satvi** - 885146977 - satvi.sanjyot@csu.fullerton.edu
- **Abhinav Singh** - 884448622 - abhinavsingh@csu.fullerton.edu
- **Aditya Singh** - 884448614 - singhaditya@csu.fullerton.edu

## Project Overview
CryptoZombies is an interactive coding tutorial that teaches users how to build Ethereum smart contracts with Solidity. For our midterm project, we developed a decentralized application (DApp) that allows users to create, feed, and level up their own zombie army.

## Enhancements Implemented
1. **Deployment on Sepolia Testnet:** We deployed our smart contracts on the Sepolia testnet to demonstrate real-world blockchain interaction.
2. **Improved Website Design:** We revamped the user interface for a more engaging and intuitive experience.
3. **Feeding on Kitties:** We integrated a custom kitty smart contract to simulate zombies feeding on kitties.
4. **Additional Functionalities:** Users can now transfer zombies and view detailed zombie statistics.

## Installation and Setup
To set up and run the CryptoZombies DApp on your local machine, follow these steps:

1. Clone the repository:
git clone https://github.com/sanjyot242/BlockChain-Midterm.git

2. Install dependencies:
npm install

3. Start a local blockchain network using Ganache:
ganache-cli

4. Deploy the smart contracts:
truffle migrate --reset

5. Run the frontend application:
npm start

6. Connect your MetaMask wallet to the local network and import accounts from Ganache.

## Technologies Used
- Solidity for smart contracts
- Truffle for smart contract deployment and testing
- Ganache for a local blockchain network
- Web3.js for blockchain interaction
- React for frontend development

## Future Improvements
- Implement a battle system where zombies can fight against each other.
- Introduce a marketplace for trading zombies as non-fungible tokens (NFTs).
- Expand the game mechanics with more features and challenges.
