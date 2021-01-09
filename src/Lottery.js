
//import keys from './config/keys';
//import { Provider } from 'ethers/providers';
import { Contract, ethers } from 'ethers';
//import provider from './provider';
//const Wallet = ethers.Wallet;
//const Contract = ethers.Contract;
//const providers = ethers.providers; 
//const network = 'rinkeby';
const address = '0x4A80E9FA9EB05eEf3cB8274e2d321614189920B6';
const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "lotteryOpen",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "players",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "gains",
          "type": "uint256"
        }
      ],
      "name": "LotteryDrawnEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "player",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "pool",
          "type": "uint256"
        }
      ],
      "name": "PlayerEnteredEvent",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "enter",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "randomNumber",
          "type": "uint256"
        }
      ],
      "name": "pickWinner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getPlayers",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  //let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  //let provider = new providers.InfuraProvider(network, keys.infura_api_key);
  //let provider = ethers.getDefaultProvider('rinkeby');
  //let wallet = new Wallet(keys.private_key, provider);
  export async function getContract() {
    let provider = getProvider();
    return new Contract(address, abi, provider);
  }

  async function getProvider() {
    let result;
    // Modern dapp browsers/metamask
    if (window.ethereum) {
        const provider = window.ethereum;
        try {
            // Request account access
            console.log(provider);
            await provider.enable();
            //provider.send('eth_requestAccounts')
            //console.log(accounts);
            result = provider;
            //console.log('modern dapp browser');
        } catch (error) {
            // User denied account access...
            console.error(error);
            throw error();
        }
    }   
    // Legacy dapp browsers...
    else if (window.web3) {
        result = window.web3.currentProvider;
        //console.log("legacy dapp browser");
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
        result = ethers.providers.getDefaultProvider();
    // console.log("using web3 from localhost");
    }

    return result;
}



  


  //export default web3.eth.Contract(abi, address);