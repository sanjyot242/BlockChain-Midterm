import { useState, useEffect } from 'react';
import Web3 from 'web3';
import cryptoZombiesABI from '../cryptozombies_abi.json';
import './CryptoZombie.css';

const CryptoZombies = () => {
  const [web3, setWeb3] = useState(null);
  const [cryptoZombies, setCryptoZombies] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [zombies, setZombies] = useState([]);
  const [status, setStatus] = useState('Initial');

  console.log(zombies);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setUserAccount(accounts[0]);
          const cryptoZombiesContract = new web3Instance.eth.Contract(
            cryptoZombiesABI,
            '0xd0dEF43d385A19575a25d0AC654b7AE8dcBE98ee'
          );
          setCryptoZombies(cryptoZombiesContract);
          fetchZombies(accounts[0], cryptoZombiesContract);
        } catch (error) {
          console.error('Could not connect to wallet', error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const fetchZombies = async (owner, contract) => {
    const ids = await contract.methods.getZombiesByOwner(owner).call();
    const zombiesPromise = ids.map((id) => contract.methods.zombies(id).call());
    const zombies = await Promise.all(zombiesPromise);
    setZombies(zombies);
  };

  const createRandomZombie = async (name) => {
    await cryptoZombies.methods
      .createRandomZombie(name)
      .send({ from: userAccount });
    fetchZombies(userAccount, cryptoZombies);
  };

  const feedOnKitty = async (zombieId, kittyId) => {
    await cryptoZombies.methods
      .feedOnKitty(zombieId, kittyId)
      .send({ from: userAccount });
    fetchZombies(userAccount, cryptoZombies);
  };

  const levelUp = async (zombieId) => {
    setStatus('Leveling up your Zombie');
    await cryptoZombies.methods
      .levelUp(zombieId)
      .send({ from: userAccount, value: web3.utils.toWei('0.001', 'ether') });
    fetchZombies(userAccount, cryptoZombies);
    setStatus('Power overwhelming! Zombie successfully leveled up');
  };

  // useEffect(() => {
  //   if (cryptoZombies && userAccount) {
  //     getZombiesByOwner(userAccount);
  //   }
  // }, [cryptoZombies, userAccount]);

  return (
    <div className='crypto-zombies-container'>
      <div id='txStatus'>
        <p>{status}</p>
      </div>
      <div>
        {zombies.map((zombie, index) => (
          <div key={index} className='zombie'>
            <ul>
              <li>Name: {zombie.name}</li>
              <li>DNA: {Number(zombie.dna)}</li>
              <li>Level: {Number(zombie.level)}</li>
              <li>Wins: {Number(zombie.winCount)}</li>
              <li>Losses: {Number(zombie.lossCount)}</li>
              <li>
                Ready Time:{' '}
                {new Date(Number(zombie.readyTime) * 1000).toLocaleString()}
              </li>
            </ul>
            <button className='button' onClick={() => levelUp(index)}>
              Level Up
            </button>
          </div>
        ))}
      </div>
      <button
        className='button'
        onClick={() => createRandomZombie(userAccount)}>
        Create Zombie
      </button>
    </div>
  );
};

export default CryptoZombies;
