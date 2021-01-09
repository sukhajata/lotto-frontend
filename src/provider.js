//import Web3 from 'web3';
import { ethers } from 'ethers';


 /*/ Checking if Web3 has been injected by the browser (Mist/MetaMask/EthersWallet)
 if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    const web3Provider = new ethers.providers.Web3Provider(web3.currentProvider);
    //get signer
    result = web3Provider.getSigner();
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // Allow read-only access to the blockchain if no Mist/Metamask/EthersWallet
    result = ethers.providers.getDefaultProvider();
  }*/
async function getProvider() {
    let result;
    // Modern dapp browsers/metamask
    if (window.ethereum) {
        const provider = window.ethereum;
        try {
            // Request account access
            await window.ethereum.enable();
            result = provider.getSigner();
            //console.log('modern dapp browser');
        } catch (error) {
            // User denied account access...
            console.error("User denied account access");
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

//const web3 = new Web3(web3Provider);
export default getProvider;
//export default new providers.Web3Provider(web3Provider);