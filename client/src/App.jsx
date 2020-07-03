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

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Typography, Space } from 'antd';
import { Modal } from 'antd';
const { Paragraph } = Typography;
const { Text, Link } = Typography;
class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, parentContract: null, contract: null, showmodal: false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      let accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryPaardarshak.networks[networkId];

      if (typeof deployedNetwork === 'undefined') {
        this.setState({ showmodal: true });
      }

      const instance = new web3.eth.Contract(
        FactoryPaardarshak.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance)
      this.setState({ web3, accounts, parentContract: instance });



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
        <div className="loading">
          <Spin tip="">
            <Alert
              message={<div style={{ textAlign: 'center', color: '#000', fontSize: '22px', fontFamily: '"Open Sans", sans-serif' }}>
                Loading<br />Web3, Accounts, and Contract... <br />
              </div>
              }
              description=""
              type="info"
            />
          </Spin>
        </div>
      )
    }
    if (!this.state.showmodal) {
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
    return (
      <div>
        {this.error}
        <Modal
          title={<Text style={{ color: "red" }} >Incorrect Network</Text>}
          style={{ top: 20 }
          }
          visible={this.state.showmodal}

          footer={[
            // <Button key="Go to Faucet" onClick={this.handleCancel}>
            //   Return
            // </Button>,
            // <Button key="GettinMatic" type="primary" loading={loading} onClick={this.handleOk}>
            //   Submit
            // </Button>,
          ]}
        >

          <Space direction="vertical">

            <Text>Please Select Matic TestnetV3 as your network in wallet provider. </Text>
          </Space>
          <Text> If you dont have Matic TestnetV3 configured, add following rpc as custom rpc</Text>

          <Paragraph copyable> <a href="https://testnetv3.matic.network" style={{ color: "#1890ff" }}>https://testnetv3.matic.network</a></Paragraph>

          <Text>You can request Matic Tokens from </Text>
          {/* <Link href="https://faucet.matic.network/" target="_blank">
            Matic Faucet
    </Link> */}
          <a href="https://faucet.matic.network/" style={{ color: "#1890ff" }}>Faucet</a>

        </Modal >
      </div >

    )
  }
}

export default App;
