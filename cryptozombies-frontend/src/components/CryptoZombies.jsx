import { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import cryptoZombiesABI from '../cryptozombies_abi.json';
import './CryptoZombie.css';

const CryptoZombies = () => {
  const [web3, setWeb3] = useState(null);
  const [cryptoZombies, setCryptoZombies] = useState(null);
  const [cryptoKitties, setkittyContract] = useState(null);
  // const [feedingContract, setFeedingContract] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [zombies, setZombies] = useState([]);
  const [status, setStatus] = useState('');
  const zombieNameRef = useRef('');

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
            '0xA4C9E3EAF9F59053BfBCae88daFaA5728C9A7d07'
          );
          const KittyContract = new web3Instance.eth.Contract(
            cryptoZombiesABI,
            '0xF59D7a790cd265Fed4a3B7658cE74dD51BBc8b89'
          );

          // const FeedingContract = new web3Instance.eth.Contract(
          //   cryptoZombiesABI,
          //   '0xF2094BAB68100D58C23fe5e6A452563e64447325'
          // );
          setCryptoZombies(cryptoZombiesContract);
          setkittyContract(KittyContract);
          // setFeedingContract(FeedingContract);
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

  // const fetchContractAddress = async () => {
  //   try {
  //     const response = await fetch('contractAddresses.txt');
  //     const text = await response.text();
  //     const lines = text.split('\n');
  //     const zombieOwnershipLine = lines.find((line) =>
  //       line.includes('zombieownership')
  //     );
  //     const address = zombieOwnershipLine.split(': ')[1];
  //     setZombieOwnershipAddress(address);
  //   } catch (error) {
  //     console.error('Error fetching contract address:', error);
  //   }
  // };

  const fetchZombies = async (owner, contract) => {
    const ids = await contract.methods.getZombiesByOwner(owner).call();
    const zombiesPromise = ids.map((id) => contract.methods.zombies(id).call());
    const zombies = await Promise.all(zombiesPromise);
    setZombies(zombies);
  };

  const createRandomZombie = async () => {
    console.log('createZombie', zombieNameRef.current.value);
    const name = zombieNameRef.current.value;
    if (!name) {
      setStatus('Please enter a name for your zombie');
      return;
    }
    const gas = await cryptoZombies.methods
      .createRandomZombie(name)
      .estimateGas({ from: userAccount });
    console.log('gas', gas);
    const receipt = await cryptoZombies.methods
      .createRandomZombie(name)
      .send({ from: userAccount, gas });
    console.log('receipt', receipt);
    zombieNameRef.current.value = '';
    fetchZombies(userAccount, cryptoZombies);
  };

  // const feedOnKitty = async (zombieId) => {
  //   const kittyId = prompt('Enter new name for zombie', '');
  //   console.log(kittyId.toString());
  //   await feedingContract.methods
  //     .feedOnKitty(zombieId, kittyId.toString())
  //     .send({ from: userAccount });
  //   fetchZombies(userAccount, cryptoZombies);
  // };

  const createKitty = async () => {
    await cryptoKitties.methods
      .createRandomKitty('NoName')
      .send({ from: userAccount });
  };

  const levelUp = async (zombieId) => {
    setStatus('Leveling up your Zombie');
    await cryptoZombies.methods
      .levelUp(zombieId)
      .send({ from: userAccount, value: web3.utils.toWei('0.001', 'ether') });
    fetchZombies(userAccount, cryptoZombies);
    setStatus('Power overwhelming! Zombie successfully leveled up');
  };

  const levelDown = async (zombieId) => {
    setStatus('Leveling down your Zombie');
    const gas = await cryptoZombies.methods
      .levelDown(zombieId)
      .estimateGas({ from: userAccount });
    console.log('gas', gas);
    const receipt = await cryptoZombies.methods
      .levelDown(zombieId)
      .send({ from: userAccount, value: web3.utils.toWei('0.001', 'ether') });
    console.log('receipt', receipt);

    /*await cryptoZombies.methods
      .levelDown(zombieId)
      .send({ from: userAccount, value: web3.utils.toWei('0.001', 'ether') });*/
    fetchZombies(userAccount, cryptoZombies);
    setStatus('Power degrading! Zombie successfully leveled down');
  };

  // useEffect(() => {
  //   if (cryptoZombies && userAccount) {
  //     getZombiesByOwner(userAccount);
  //   }
  // }, [cryptoZombies, userAccount]);

  // return (
  //   <div className='crypto-zombies-container'>
  //     {status != '' && (
  //       <div id='txStatus'>
  //         <p>{status}</p>
  //       </div>
  //     )}

  //     <div>
  //       {zombies.map((zombie, index) => (
  //         <div key={index} className='zombie'>
  //           <img src={greenZombie} alt='Zombie' className='zombie-image' />
  //           <ul>
  //             <li>Name: {zombie.name}</li>
  //             <li>DNA: {Number(zombie.dna)}</li>
  //             <li>Level: {Number(zombie.level)}</li>
  //             <li>Wins: {Number(zombie.winCount)}</li>
  //             <li>Losses: {Number(zombie.lossCount)}</li>
  //             <li>
  //               Ready Time:{' '}
  //               {new Date(Number(zombie.readyTime) * 1000).toLocaleString()}
  //             </li>
  //           </ul>
  //           <button className='button' onClick={() => levelUp(index)}>
  //             Level Up
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //     <button className='button' onClick={() => createRandomZombie('Sam')}>
  //       Create Zombie
  //     </button>
  //   </div>
  // );

  return (
    <div className='bg-gray-900 min-h-screen text-white py-8'>
      <div className='container mx-auto text-center'>
        <div className='mb-8'>
          <input
            type='text'
            ref={zombieNameRef}
            placeholder='Enter Zombie Name'
            className='text-black mx-2 py-2 px-4 rounded-l-full'
          />
          <button
            className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-r-full shadow-lg'
            onClick={() => createRandomZombie()}>
            Create Zombie
          </button>
          <button
            className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-r-full shadow-lg'
            onClick={() => createKitty()}>
            Create Kitty
          </button>
        </div>

        {status != '' && (
          <div id='txStatus' className='mb-4'>
            <p className='text-green-400'>{status}</p>
          </div>
        )}

        <div className='flex flex-wrap -mx-3 p-6'>
          {zombies.map((zombie, index) => (
            <div key={index} className='w-full md:w-1/3 px-3 mb-6'>
              <div className='zombie bg-gray-700 hover:bg-gray-600 shadow-lg rounded-lg p-4 flex flex-col items-center transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <div className='w-44 h-44 mb-4 flex items-center justify-center rounded-full p-2'>
                  <img
                    src={`https://robohash.org/${index + zombie.name}?set=set1`}
                    alt='Zombie'
                    className='zombie-image object-cover rounded-none'
                  />
                </div>
                <div className='text-left w-full'>
                  <h2 className='text-lg font-bold mb-1'>
                    Name: {zombie.name}
                  </h2>
                  <p className='text-md'>DNA: {Number(zombie.dna)}</p>
                  <p className='text-md'>Level: {Number(zombie.level)}</p>
                  <p className='text-sm mb-4'>
                    Ready Time:{' '}
                    {new Date(Number(zombie.readyTime) * 1000).toLocaleString()}
                  </p>
                  <button
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
                    onClick={() => levelUp(index)}>
                    Level Up
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoZombies;
