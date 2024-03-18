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

4. Connect your MetaMask wallet to the local network and import accounts from Ganache.

5. Deploy the smart contracts on Ganache:
   truffle migrate --network ganache

6. Run the frontend application:
   npm start

## Deployment on Sepolia Testnet

To deploy and test on Sepolia Testnet, follow these steps:

1. Setup repo on Remix by importing it from Github:
   https://remix.ethereum.org/

2. Add Sepolia TestNet to Metamask, Details @ https://chainid.network/

3. To deploy ZombieOwnership contract, Go to Deploy section in remix, set the environment to "Injected Provider - Metamask", give your Metamask extension the necessary permission that it will ask when you change the environment.

4. After setting environment, select the ZombieOwnership contract and click on deploy, you can see the confirmation of deployment on console or you can check it on https://sepolia.etherscan.io/block/<block-id>,

## Technologies Used

- Solidity for smart contracts
- Truffle for smart contract deployment and testing
- Ganache for a local blockchain network
- Sepolia for a private Ethereum network
- Web3.js for blockchain interaction
- React for frontend development
