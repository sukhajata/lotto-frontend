import React, { Component } from 'react';
//import TruffleContract from 'truffle-contract';
import { getContract } from './Lottery';
import { utils, ethers }  from 'ethers';
//import provider from './web3';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      manager: '',
      players: [],
      balance: '',
      usd: 0,
      value: '',
      message: '',
    }

  }

  
  async componentDidMount() {
    this.setState({ isLoading: true });

    const lottery =  getContract();
    this.setState({ lottery });
    const manager = await lottery.manager();
    await this.updateData();

    this.setState({ isLoading: false, manager  });
  }

 
  updateData = async () => {
    const players = await this.state.lottery.getPlayers();
    const balanceWei = await this.state.lottery.getBalance();
    const balance = utils.formatEther(balanceWei);
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
    const json = await response.json();
    const exchangeRate = parseFloat(json.USD);
    const usd = Math.round(exchangeRate * parseFloat(balance) * 100) / 100; //round to 2dp

    this.setState({ players, balance, usd});
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ message: 'Waiting on transaction success...' });

    try {
      const accounts = await this.state.lottery.provider.listAccounts();
      var amount = utils.parseEther('0.021');
      let tx = await this.state.lottery.enter({ from: accounts[0], value: amount });
      console.log(tx);
      await this.updateData();
      this.setState({ message: 'You entered with transaction: ' + tx.hash });
    } catch(error) {
      console.log(error);
      this.setState({ message: 'Transaction falied!' });
    }
    /*
    web3.eth.getAccounts(function(err, res) {
        if (res) {
          lottery.enter()({
              from: res[0],
              value: 20100000000000000000000000000000000
            });

            this.setState({ message: 'You have been entered!' });
        } else {
          console.log(err);
        }
    })*/
    
  };

  onClick = async () => {
    /*const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });*/
  };


  handlePay(event) {
    event.preventDefault();

    this.web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      this.Lottery.deployed().then(function(instance) {
        // Execute as a transaction by sending account
        return instance.enter({
          from: accounts[0],
          value: 2.01e+16
        });

      }).then(function(result) {
        return this.markPaid();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

  render() {
    //console.log(web3.version);

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="App">
        <h2>Lottery</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>Current prize pool is {this.state.balance} ether ({this.state.usd} USD)<br/>
          Conversion provided by https://www.cryptocompare.com/api/</p>
        <p>Number of entries: {this.state.players.length}</p>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <button>Enter</button>
        </form>
        <p>{this.state.message}</p>

        
      </div>
    );
  }
}

export default App;
