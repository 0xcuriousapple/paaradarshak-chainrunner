import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import { Router, Route } from "react-router-dom";
import Home from './components/home';
import 'antd/dist/antd.css';
import history from "./history";
import { message } from 'antd';
import { Spin, Alert } from 'antd';
//blockchain imports
import FactoryPaardarshak from "./contracts/factorypaardarshak.json";
import Paardarshak from "./contracts/paardarshak.json";
import getWeb3 from "./getWeb3";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, parentcontract: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      let accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryPaardarshak.networks[networkId];
      const instance = new web3.eth.Contract(
        FactoryPaardarshak.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance)
      // this.setState({ web3, accounts, contract: instance });
      instance.methods.createFunds("check", "checkdesc").send({ from: accounts[0], gas: 3000000 })
        .then((receipt) => {
          console.log(receipt);
          this.setState({ web3, accounts, contract: instance });
          let all;
          instance.methods.getAllDeployedFunds().call({ from: accounts[0], gas: 3000000 }).
            then((result) => {
              all = result;
              let add = all[all.length - 1];
              const instance2 = new web3.eth.Contract(Paardarshak.abi, add);
              instance2.methods.getAllTokenKeys().call({ from: accounts[0], gas: 30000000 })
                .then((result) => {
                  console.log(result);
                })

              this.setState({ web3, accounts, contract: instance2 });

            })

        })


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

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
        <Spin tip="Loading...">
          <Alert
            message="Loading"
            description="Web3, accounts, and contract..."
            type="info"
          />
        </Spin>)
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
