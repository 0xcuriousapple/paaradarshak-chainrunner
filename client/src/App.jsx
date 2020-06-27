import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import { Router, Route } from "react-router-dom";
import Home from './components/home';
import 'antd/dist/antd.css';
import history from "./history";
import { message } from 'antd';
import { Spin, Alert } from 'antd';
//blockchain imports
import Paardarshak from "./contracts/paardarshak.json";
import getWeb3 from "./getWeb3";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      let accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Paardarshak.networks[networkId];
      const instance = new web3.eth.Contract(
        Paardarshak.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      window.ethereum.on('accountsChanged', (acc) => {
        this.setState({ accounts: acc })
      })
    } catch (error) {

      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }


  };


  render() {
    if (!this.state.web3) {
      return (
        <div className="loading">
          <Spin tip="">
            <Alert
              message={<div style={{ textAlign: 'center', color: '#000', fontSize: '22px', fontFamily: '"Open Sans", sans-serif' }}>Loading<br />Web3, accounts, and contract...</div>}
              description=""
              type="info"
            />
          </Spin>
        </div>
      )
    }
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Home web3={this.state} />
            {/* <Route exact path="/" component={LoginContainer} />
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/snippets" component={SnippetsContainer} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
