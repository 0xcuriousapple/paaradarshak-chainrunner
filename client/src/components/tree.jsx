import React from "react";
import Tree from "react-d3-tree";
import { Drawer, Input } from "antd";
import { Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Graph } from "react-d3-graph";
import CytoscapeComponent from "react-cytoscapejs";
import { Typography, Space } from 'antd';
import { List, Divider } from 'antd';
import { Spin, Alert } from 'antd';
const { Text, Title } = Typography;
const myConfig = {
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  directed: true,
  height: "650",
  width: "1500",
  d3: {
    gravity: -500,
    // linkLength: 600,
  },

  node: {
    color: "lightgreen",
    size: 400,
    highlightStrokeColor: "green",
    fontSize: 14,

  },
  link: {
    color: "#001529",
    highlightColor: "lightgreen",
    fontSize: 16,
    renderLabel: true,
    labelProperty: "label",
  },
};
let tokenkeys;
let parentadd;
let linkvalue = {}
let ownerCompleteInfo = { 'root': { 'debit': {}, 'credit': { 'value': 0 } } };
// map owner to his tokens
let tokensAtAddress = {};

class RTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      tokenArray: [],
      searchTokenTxt: "",
      data: {
        nodes: [
          {
            id: "Root",
            label: "value",
            renderLabel: true,
            x: 750,
            y: 325,
            size: 500, // only this node will have size 300
            symbolType: "diamond",
          },
        ],
        links: [],
      },
      selectedNode: "",
      debitlist: [],
      creditlist: [],
      totalrecv: "",
      totalu: "",
      totalr: "",
      drawerVisibleRoot: false,
      drawerVisibleLink: false,
      selectedLinkSource: "",
      selectedLinkDestination: "",
      linklist: [],
      loadlist: true,
    };
  }

  componentDidMount = async () => {
    linkvalue = {}
    ownerCompleteInfo = { 'root': { 'debit': {}, 'credit': { 'value': 0 } } };
    // map owner to his tokens
    tokensAtAddress = {};
    const { accounts, contract } = this.props.web3;



    try {
      let data = this.state.data;
      contract.methods
        .getAllTokenKeys()
        .call({ from: accounts[0], gas: 3000000 })
        .then((result) => {
          console.log(result);
          tokenkeys = result;

        })
        .then(() => {
          if (typeof tokenkeys[0] === 'undefined') {

          }
          else {
            let i = 0;
            let ifnodeexist = {};
            let promises = [];

            contract.methods
              .getSingleTokenDetails(tokenkeys[0])
              .call({ from: accounts[0], gas: 3000000 })
              .then((result) => {
                parentadd = result.CompleteHistoryOfToken[0]._owner;
              }).then(() => {
                for (i = 0; i < tokenkeys.length; i++) {
                  let value = tokenkeys[i];
                  //console.log(ownerCompleteInfo);
                  promises.push(
                    new Promise(function (resolve, reject, i) {


                      contract.methods
                        .getSingleTokenDetails(value)
                        .call({ from: accounts[0], gas: 3000000 })
                        .then((result) => {
                          let temp;
                          temp = result.CompleteHistoryOfToken;
                          let j;
                          console.log(temp);

                          for (j = 0; j < temp.length; j++) {
                            if (
                              !ifnodeexist.hasOwnProperty(temp[j]._owner) &&
                              parentadd != temp[j]._owner
                            ) {
                              ifnodeexist[temp[j]._owner] = true;
                              data.nodes.push({ id: temp[j].nameOfOwner });
                              ownerCompleteInfo[temp[j].nameOfOwner] = {

                                'credit': {},
                                'debit': {}
                              }
                              if (j != temp.length - 1) ownerCompleteInfo[temp[j + 1].nameOfOwner] = {
                                'credit': {},
                                'debit': {}
                              }
                            }
                            let flag = 1;
                            if (j < temp.length - 1 && temp[j].nameOfOwner == temp[j + 1].nameOfOwner) {
                              flag = 0;
                            }
                            if (temp[j]._owner == parentadd && flag == 1) {
                              //root owner credit
                              console.log('sdf');
                              ownerCompleteInfo['root'].credit.value = parseInt(ownerCompleteInfo['root'].credit.value) + parseInt(temp[j].value);
                            }
                            if (flag == 1) {
                              // j owner credit
                              let name = temp[j].nameOfOwner;
                              if (temp[j]._owner != parentadd) {

                                //console.log(name);
                                let t = ownerCompleteInfo[name];
                                let credit = t['credit'];
                                //let credit = ownerCompleteInfo[temp[j].nameOfOwner]['credit'];
                                if (credit.hasOwnProperty(temp[j].purpose)) {
                                  credit[temp[j].purpose].value = credit[temp[j].purpose].value + parseInt(temp[j].value);
                                  credit[temp[j].purpose].tokens.push(tokenkeys[i]);
                                  if (credit[temp[j].purpose].from == "") {
                                    if (typeof temp[j - 1] === 'undefined') {
                                      credit[temp[j].purpose].from = ""
                                    }
                                    else {
                                      credit[temp[j].purpose].from = temp[j - 1].nameOfOwner;

                                    }
                                  }
                                }
                                else {
                                  if (typeof temp[j - 1] === 'undefined') {
                                    credit[temp[j].purpose] = { 'value': parseInt(temp[j].value), 'from': "", 'tokens': [tokenkeys[i]] }
                                  }
                                  else {
                                    credit[temp[j].purpose] = { 'value': parseInt(temp[j].value), 'from': temp[j - 1].nameOfOwner, 'tokens': [tokenkeys[i]] }

                                  }

                                }
                                ownerCompleteInfo[name]['credit'] = credit;
                              }
                            }

                            if (j < temp.length - 1 && flag == 1) {
                              //j owner debit
                              let name = temp[j].nameOfOwner;
                              if (temp[j]._owner === parentadd) name = 'root'

                              let t = ownerCompleteInfo[name];
                              let debit = t['debit'];
                              if (debit.hasOwnProperty(temp[j + 1].purpose)) {
                                debit[temp[j + 1].purpose].value = debit[temp[j + 1].purpose].value + parseInt(temp[j + 1].value);
                                debit[temp[j + 1].purpose].tokens.push(tokenkeys[i]);
                              }
                              else {
                                debit[temp[j + 1].purpose] = { 'value': parseInt(temp[j + 1].value), 'to': temp[j + 1].nameOfOwner, 'tokens': [tokenkeys[i]] }
                              }
                              ownerCompleteInfo[name]['debit'] = debit;
                            }

                            if (j < temp.length - 1) {
                              if (temp[j].nameOfOwner != temp[j + 1].nameOfOwner) {


                                if (temp[j]._owner == parentadd) {
                                  let link = 'root' + temp[j + 1].nameOfOwner;
                                  if (linkvalue.hasOwnProperty(link)) {
                                    let prop = linkvalue[link]
                                    linkvalue[link].totalvalue = parseInt(linkvalue[link].totalvalue) + parseInt(temp[j + 1].value);
                                    if (!linkvalue[link].purposes.hasOwnProperty(temp[j + 1].purpose)) linkvalue[link].purposes[temp[j + 1].purpose] = 0;
                                    linkvalue[link].purposes[temp[j + 1].purpose] = parseInt(linkvalue[link].purposes[temp[j + 1].purpose]) + parseInt(temp[j + 1].value);
                                    data.links[prop.index].label = parseInt(data.links[prop.index].label) + parseInt(temp[j + 1].value)

                                  }
                                  else {

                                    data.links.push({
                                      source: "Root",
                                      target: temp[j + 1].nameOfOwner,
                                      label: parseInt(temp[j + 1].value),
                                    });
                                    linkvalue[link] = {

                                      'index': data.links.length - 1,
                                      'totalvalue': parseInt(temp[j + 1].value),
                                      'purposes': {
                                        [temp[j + 1].purpose]: parseInt(temp[j + 1].value)
                                      }

                                    }
                                  }

                                } else if (temp[j + 1]._owner == parentadd) {
                                  let link = temp[j + 1].nameOfOwner + 'root';

                                  if (linkvalue.hasOwnProperty(link)) {

                                    let prop = linkvalue[link]
                                    linkvalue[link].totalvalue = parseInt(linkvalue[link].totalvalue) + parseInt(temp[j + 1].value);
                                    if (!linkvalue[link].purposes.hasOwnProperty(temp[j + 1].purpose)) linkvalue[link].purposes[temp[j + 1].purpose] = 0;
                                    linkvalue[link].purposes[temp[j + 1].purpose] = parseInt(linkvalue[link].purposes[temp[j + 1].purpose]) + parseInt(temp[j + 1].value);
                                    data.links[prop.index].label = parseInt(data.links[prop.index].label) + parseInt(temp[j + 1].value)
                                  }
                                  else {

                                    data.links.push({
                                      source: temp[j].nameOfOwner,
                                      target: "Root",
                                      label: parseInt(temp[j + 1].value),
                                    });
                                    linkvalue[link] = {

                                      'index': data.links.length - 1,
                                      'totalvalue': parseInt(temp[j + 1].value),
                                      'purposes': {
                                        [temp[j + 1].purpose]: parseInt(temp[j + 1].value)
                                      }

                                    }
                                  }

                                } else {
                                  let link = temp[j].nameOfOwner + temp[j + 1].nameOfOwner;
                                  if (linkvalue.hasOwnProperty(link)) {

                                    let prop = linkvalue[link]
                                    linkvalue[link].totalvalue = parseInt(linkvalue[link].totalvalue) + parseInt(temp[j + 1].value);
                                    if (!linkvalue[link].purposes.hasOwnProperty(temp[j + 1].purpose)) linkvalue[link].purposes[temp[j + 1].purpose] = 0;
                                    linkvalue[link].purposes[temp[j + 1].purpose] = parseInt(linkvalue[link].purposes[temp[j + 1].purpose]) + parseInt(temp[j + 1].value);
                                    data.links[prop.index].label = parseInt(data.links[prop.index].label) + parseInt(temp[j + 1].value);
                                  }
                                  else {

                                    data.links.push({
                                      source: temp[j].nameOfOwner,
                                      target: temp[j + 1].nameOfOwner,
                                      label: parseInt(temp[j + 1].value)
                                    });
                                    linkvalue[link] = {

                                      'index': data.links.length - 1,
                                      'totalvalue': parseInt(temp[j + 1].value),
                                      'purposes': {
                                        [temp[j + 1].purpose]: parseInt(temp[j + 1].value)
                                      }
                                    }
                                  }

                                }

                                // this.setState({ data: t })
                              }
                              if (!tokensAtAddress.hasOwnProperty(temp[j]._owner)) {
                                tokensAtAddress[temp[j]._owner] = [];
                              }
                              tokensAtAddress[temp[j]._owner].push(value);
                            }
                          }

                          // this.setState({ 'data': { ...data } })
                        })
                        .then(() => {
                          //console.log("resolved");
                          resolve();
                        })
                    })
                  );
                }

                Promise.all(promises).then(() => {
                  console.log("resolved all");
                  this.setState({ data: data });
                  console.log(this.state.data);
                  console.log(ownerCompleteInfo);
                  console.log(linkvalue);
                  this.setState({ loadlist: false })
                });
              });
          }
        })

    } catch (error) {
      // Catch any errors for any of the above operations.
      message.error("Sorry TX was not successful Please refer console");
      console.log(error);
    }


  };
  // data = {
  //   nodes:
  //     [
  //       { id: "Root", label: "value", renderLabel: true, x: 750, y: 325 },
  //       { id: "Auth 1" },
  //       { id: "acc 7" },
  //       { id: "Auth 2" },
  //     ],
  //   links:
  //     [
  //       { source: "Root", target: "Auth 1", label: 5 },
  //       { source: "Auth 1", target: "acc 7", label: 5 },
  //       { source: "Root", target: "Auth 2", label: 5 },
  //     ]
  // }

  handleClick = (name) => {
    console.log("Token name:", name);
    this.setState({ drawerVisible: true });
  };
  handleToggleDrawer = (bool) => {
    this.setState({ drawerVisible: bool });
  };
  handleToggleDrawerRoot = (bool) => {
    this.setState({ drawerVisibleRoot: bool });
  };
  handleToggleDrawerLink = (bool) => {
    this.setState({ drawerVisibleLink: bool });
  };
  onClickNode = (nodeId) => {
    // window.alert(`Clicked node ${nodeId}`);

    if (nodeId === 'Root') {
      this.setState({ 'drawerVisibleRoot': true });
      this.setState({ selectedNode: nodeId })

      //credit
      this.setState({ totalrecv: ownerCompleteInfo['root'].credit.value });
      this.setState({ tokenArray: tokensAtAddress[parentadd] })
      //debit
      let t = ownerCompleteInfo['root'].debit;
      let tempdebitlist = [];
      let temptu = 0;
      for (const [key, value] of Object.entries(t)) {
        tempdebitlist.push({ Purpose: key, Funds: value.value, To: value.to });
        temptu = temptu + parseInt(value.value);
      }
      this.setState({ debitlist: tempdebitlist });
      this.setState({ totalu: temptu });
      this.setState({ totalr: ownerCompleteInfo['root'].debit.value - temptu });
    }
    else {

      this.setState({ 'drawerVisible': true });
      this.setState({ selectedNode: nodeId })
      this.setState({ drawertype: 'normal' });
      //credit
      let t1 = ownerCompleteInfo[nodeId].credit;
      let tempcreditlist = [];
      let temptrecv = 0;
      for (const [key, value] of Object.entries(t1)) {
        tempcreditlist.push({ Purpose: key, Funds: value.value, From: value.from });
        temptrecv = temptrecv + parseInt(value.value);
      }
      this.setState({ creditlist: tempcreditlist });
      this.setState({ totalrecv: temptrecv });



      //debit
      let t = ownerCompleteInfo[nodeId].debit;
      let tempdebitlist = [];
      let temptu = 0;
      for (const [key, value] of Object.entries(t)) {
        tempdebitlist.push({ Purpose: key, Funds: value.value, To: value.to });
        temptu = temptu + parseInt(value.value);
      }
      this.setState({ debitlist: tempdebitlist });
      this.setState({ totalu: temptu });
      this.setState({ totalr: temptrecv - temptu });
    }


  };

  onClickLink = (source, target) => {

    if (source == 'Root') source = 'root';
    this.setState({ 'drawerVisibleLink': true });
    this.setState({ selectedLinkSource: source })
    this.setState({ selectedLinkDestination: target })
    let t = linkvalue[source + target].purposes
    let templinklist = [];
    for (const [key, value] of Object.entries(t)) {
      templinklist.push({ Purpose: key, Funds: value })
    }
    this.setState({ linklist: templinklist });
    this.setState({ totalrecv: linkvalue[source + target].totalvalue })
  };

  handleSearchToken = (e) => {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  };
  render() {

    if (this.state.loadlist) {
      return (
        <div className="loading">
          <Spin tip="">
            <Alert
              message={<div style={{ textAlign: 'center', color: '#000', fontSize: '22px', fontFamily: '"Open Sans", sans-serif' }}>
                Loading<br />Tree<br />
              </div>
              }
              description=""
              type="info"
            />
          </Spin>
        </div>
      )
    }
    else {
      return (

        <div className="tree">
          <Title level={4}>Please click on the node or link to get more details.</Title>
          <div id="treeWrapper" style={{ width: "100%", height: "80vh" }}>


            {/* Normal drawer */}

            <Drawer
              width={310}
              className="token-drawer-wrapper"
              title={this.state.selectedNode}
              placement="right"
              closable={true}
              onClose={() => this.handleToggleDrawer(false)}
              visible={this.state.drawerVisible}
            >
              <Space direction="vertical">

                {/* <Title level={3}></Title> */}
                <Divider orientation="left" style={{ fontSize: '20px' }}>Credit</Divider>
                <Text style={{ fontSize: '18px' }}>Total Funds Received: {this.state.totalrecv} </Text>
                {this.state.creditlist && this.state.creditlist.map((obj) => {
                  return <div className="token-card">
                    <b>Purpose: </b>{obj.Purpose}<br />
                    <b>Funds: </b>{obj.Funds}<br />
                    <b>From: </b>{obj.From}<br />
                  </div>
                })}


                <Divider orientation="left" style={{ fontSize: '20px' }}>Debit</Divider>
                <Text style={{ fontSize: '18px' }}>Utilized Funds: {this.state.totalu} </Text>
                {this.state.debitlist && this.state.debitlist.map((obj) => {
                  return <div className="token-card">
                    <b>Purpose: </b>{obj.Purpose}<br />
                    <b>Funds: </b>{obj.Funds}<br />
                    <b>To: </b>{obj.To}<br />
                  </div>
                })}

                {/* <Text mark>Remaining Funds: {this.state.totalr}</Text> */}


              </Space>

            </Drawer>


            {/* Root drawer */}

            <Drawer
              width={310}
              className="token-drawer-wrapper"
              title={this.state.selectedNode}
              placement="right"
              closable={true}
              onClose={() => this.handleToggleDrawerRoot(false)}
              visible={this.state.drawerVisibleRoot}
            >
              <Space direction="vertical">

                {/* <Title level={3}></Title> */}
                <Divider orientation="left" style={{ fontSize: '20px' }}>Credit</Divider>

                <Text style={{ fontSize: '18px' }}>Total Funds Received: {this.state.totalrecv} </Text>
                <div className="token-drawer">
                  <Input
                    value={this.state.searchTokenTxt}
                    onChange={this.handleSearchToken}
                    name="searchTokenTxt"
                    className="search-tree-token"
                    placeholder="Enter token key"
                    prefix={<SearchOutlined />}
                  />

                  {this.state.tokenArray &&
                    this.state.tokenArray.map((token) => {
                      if (this.state.searchTokenTxt != "") {
                        if (token.toLowerCase().includes(this.state.searchTokenTxt))
                          return <div className="token-array">{token}</div>
                      }
                      else
                        return <div className="token-array">{token}</div>
                    })}
                </div>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Debit</Divider>
                <Text style={{ fontSize: '18px' }}>Utilized Funds: {this.state.totalu} </Text>
                {this.state.debitlist && this.state.debitlist.map((obj) => {
                  return <div className="token-card">
                    <b>Purpose: </b>{obj.Purpose}<br />
                    <b>Funds: </b>{obj.Funds}<br />
                    <b>To: </b>{obj.To}<br />
                  </div>
                })}

                {/* <Text mark>Remaining Funds: {this.state.totalr}</Text> */}


              </Space>

            </Drawer>


            {/* Link drawer */}

            <Drawer
              width={310}
              className="token-drawer-wrapper"
              title={"Source:" + " " + this.state.selectedLinkSource + "     " + "Target:" + " " + this.state.selectedLinkDestination}
              placement="right"
              closable={true}
              onClose={() => this.handleToggleDrawerLink(false)}
              visible={this.state.drawerVisibleLink}
            >
              <Space direction="vertical">
                <Text style={{ fontSize: '18px' }}>Total Transfered: {this.state.totalrecv} </Text>
                {this.state.linklist && this.state.linklist.map((obj) => {
                  return <div className="token-card">
                    <b>Purpose: </b>{obj.Purpose}<br />
                    <b>Funds: </b>{obj.Funds}<br />
                  </div>
                })}
              </Space>

            </Drawer>
            <Graph
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={this.state.data}
              config={myConfig}
              onClickNode={this.onClickNode}
              onClickLink={this.onClickLink}
            />
          </div>
        </div>
      );
    }
  }
}

export default RTree;