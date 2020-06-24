import React from "react";
import Tree from "react-d3-tree";
import { Drawer, Input } from "antd";
import { Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Graph } from "react-d3-graph";
import CytoscapeComponent from "react-cytoscapejs";

const myConfig = {
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  directed: true,
  height: "650",
  width: "1500",
  d3: {
    gravity: -2000,
    linkLength: 600,
  },

  node: {
    color: "lightgreen",
    size: 400,
    highlightStrokeColor: "blue",
    fontSize: 14,
  },
  link: {
    highlightColor: "blue",
    fontSize: 10,
    renderLabel: true,
    labelProperty: "label",
  },
};

// const onClickGraph = function () {
//     window.alert(`Clicked the graph background`);
// };

// const onClickNode = function (nodeId) {
//     window.alert(`Clicked node ${nodeId}`);
// };

// const onDoubleClickNode = function (nodeId) {
//     window.alert(`Double clicked node ${nodeId}`);
// };

// const onRightClickNode = function (event, nodeId) {
//     window.alert(`Right clicked node ${nodeId}`);
// };

// const onMouseOverNode = function (nodeId) {
//     window.alert(`Mouse over node ${nodeId}`);
// };

// const onMouseOutNode = function (nodeId) {
//     window.alert(`Mouse out node ${nodeId}`);
// };

// const onClickLink = function (source, target) {
//     window.alert(`Clicked link between ${source} and ${target}`);
// };

// const onRightClickLink = function (event, source, target) {
//     window.alert(`Right clicked link between ${source} and ${target}`);
// };

// const onMouseOverLink = function (source, target) {
//     window.alert(`Mouse over in link between ${source} and ${target}`);
// };

// const onMouseOutLink = function (source, target) {
//     window.alert(`Mouse out link between ${source} and ${target}`);
// };

// const onNodePositionChange = function (nodeId, x, y) {
//     window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
// };

const tokenArray = ["hsfe7sfb", "je73bwd83", "hjse833rv", "weru32478c"];

let tokenkeys;

// for parent , no of chiderns "parent" = [c1,c2,c3...]
let relations = {};

let checkifitsyourchild = {};

let ownerCompleteInfo = {};
// map owner to his tokens
let tokensAtAddress = {};

// to store the root address
let rootAddress;

class RTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      tokenArray: tokenArray,
      searchTokenTxt: "",
      data: {
        nodes: [
          {
            id: "Root",
            x: 750,
            y: 325,
            size: 500, // only this node will have size 300
            symbolType: "diamond",
          },
        ],
        links: [],
      },
    };
  }

  componentDidMount = async () => {
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
          let i = 0;
          let ifnodeexist = {};
          let promises = [];

          for (i = 0; i < tokenkeys.length; i++) {
            let value = tokenkeys[i];
            promises.push(
              new Promise(function (resolve, reject) {
                contract.methods
                  .getSingleTokenDetails(value)
                  .call({ from: accounts[0], gas: 3000000 })
                  .then((result) => {
                    let temp;
                    temp = result.CompleteHistoryOfToken;
                    let j;
                    console.log(temp);
                    let parentadd = temp[0]._owner;
                    for (j = 0; j < temp.length; j++) {
                      if (
                        !ifnodeexist.hasOwnProperty(temp[j]._owner) &&
                        parentadd != temp[j]._owner
                      ) {
                        ifnodeexist[temp[j]._owner] = true;
                        data.nodes.push({ id: temp[j].nameOfOwner });
                      }
                      if (j < temp.length - 1) {
                        if (temp[j].nameOfOwner != temp[j + 1].nameOfOwner) {
                          if (temp[j]._owner == parentadd) {
                            data.links.push({
                              source: "Root",
                              target: temp[j + 1].nameOfOwner,
                              label: `Purpose : ${temp[j + 1].purpose} Value: ${
                                temp[j + 1].value
                              }`,
                            });
                          } else if (temp[j + 1]._owner == parentadd) {
                            data.links.push({
                              source: temp[j].nameOfOwner,
                              target: "Root",
                              label: `Purpose : ${temp[j + 1].purpose} Value: ${
                                temp[j + 1].value
                              }`,
                            });
                          } else {
                            data.links.push({
                              source: temp[j].nameOfOwner,
                              target: temp[j + 1].nameOfOwner,
                              label: `Purpose : ${temp[j + 1].purpose} Value: ${
                                temp[j + 1].value
                              }`,
                            });
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
                    console.log("resolved");
                    resolve();
                  });
              })
            );
          }

          Promise.all(promises).then(() => {
            console.log("resolved all");
            this.setState({ data: data });
            console.log(this.state.data);
          });
        });
    } catch (error) {
      // Catch any errors for any of the above operations.
      message.error("Sorry TX was not successful Please refer console");
      console.log(error);
    }
  };

  handleClick = (name) => {
    console.log("Token name:", name);
    this.setState({ drawerVisible: true });
  };
  handleToggleDrawer = (bool) => {
    this.setState({ drawerVisible: bool });
  };
  handleSearchToken = (e) => {
    var name = e.target.name;
    if (e.target.value != "")
      var data = tokenArray.filter((t) => {
        return t.includes(e.target.value);
      });
    else data = tokenArray;
    this.setState({ [name]: e.target.value, tokenArray: data });
  };
  render() {
    function NodeLabel(props) {
      const { className, nodeData } = props;
      return (
        <div className={className}>
          <h4>{nodeData.name}</h4>
          <div
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => props.handleClick(nodeData.name)}
          >
            {nodeData.value}
          </div>
        </div>
      );
    }

    return (
      <div className="tree">
        <div id="treeWrapper" style={{ width: "100%", height: "80vh" }}>
          <Drawer
            className="token-drawer-wrapper"
            title="Tokens"
            placement="right"
            closable={true}
            onClose={() => this.handleToggleDrawer(false)}
            visible={this.state.drawerVisible}
          >
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
                  return <div className="token-array">{token}</div>;
                })}
            </div>
          </Drawer>

          <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={this.state.data}
            config={myConfig}
            // onClickNode={onClickNode}
            // onDoubleClickNode={onDoubleClickNode}
            // onRightClickNode={onRightClickNode}
            // onClickGraph={onClickGraph}
            // onClickLink={onClickLink}
            // onRightClickLink={onRightClickLink}
            // onMouseOverNode={onMouseOverNode}
            // onMouseOutNode={onMouseOutNode}
            // onMouseOverLink={onMouseOverLink}
            // onMouseOutLink={onMouseOutLink}
            // onNodePositionChange={onNodePositionChange}
          />
        </div>
      </div>
    );
  }
}

export default RTree;
