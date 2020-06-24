import React from 'react';
import Tree from 'react-d3-tree';
import { Drawer, Input } from 'antd';
import { Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { message } from 'antd';
const myTreeData = [
    {
        // name: 'Authority',
        // value: 320,
        // parent: 'null',
        // children: [
        //     {
        //         name: 'MLA',
        //         value: 120,
        //         parent: 'Authority',
        //         children: [
        //             {
        //                 name: 'Roads Built',
        //                 value: 100,
        //                 parent: 'MLA'
        //             },
        //             {
        //                 name: 'Hospital',
        //                 value: 20,
        //                 parent: 'MLA'
        //             }
        //         ]
        //     },
        //     {
        //         value: 200,
        //         name: 'MLA 2',
        //         parent: 'Authority'
        //     }
        // ]
    }
]
const tokenArray = ['hsfe7sfb', 'je73bwd83', 'hjse833rv', 'weru32478c'];

let tokenkeys;

// for parent , no of chiderns "parent" = [c1,c2,c3...]
let relations = {

};

let checkifitsyourchild = {

}

let ownerCompleteInfo = {

}
// map owner to his tokens
let tokensAtAddress = {

}


// to store the root address
let rootAddress;

class RTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawerVisible: false, tokenArray: tokenArray, searchTokenTxt: '' }
    }


    componentDidMount = async () => {
        const { accounts, contract } = this.props.web3;
        try {

            let promises = [];
            promises.push(
                contract.methods.getAllTokenKeys().call({ from: accounts[0], gas: 3000000 })
                    .then((result) => {
                        console.log(result);
                        tokenkeys = result
                    })
                    .then(() => {
                        let i = 0;

                        tokenkeys.reduce((p, value) => {
                            return p.then(() => {
                                promises.push(
                                    contract.methods.getSingleTokenDetails(value).call({ from: accounts[0], gas: 3000000 })
                                        .then((result) => {

                                            let temp
                                            temp = result.CompleteHistoryOfToken;
                                            let j = 0;

                                            //setting root node address;
                                            if (value) rootAddress = temp[0]._owner;


                                            console.log(temp);
                                            for (j = 0; j < temp.length; j++) {


                                                if (!ownerCompleteInfo.hasOwnProperty(temp[j]._owner)) {
                                                    ownerCompleteInfo[temp[j]._owner] = {
                                                        'name': temp[j].nameOfOwner,
                                                        'funds': parseInt(temp[j].value),
                                                    }
                                                }
                                                else {

                                                    ownerCompleteInfo[temp[j]._owner].funds += parseInt(temp[j].value);

                                                }

                                                if (j < temp.length - 1) {
                                                    if (!relations.hasOwnProperty(temp[j]._owner)) {
                                                        let t;
                                                        t = [];
                                                        relations[temp[j]._owner] = t;
                                                        checkifitsyourchild[temp[j]._owner] = {}

                                                    }

                                                    if (temp[j + 1]._owner != temp[j]._owner) {
                                                        let x = checkifitsyourchild[temp[j]._owner];
                                                        if (!x.hasOwnProperty(temp[j + 1]._owner)) {
                                                            relations[temp[j]._owner].push(temp[j + 1]._owner);
                                                            checkifitsyourchild[temp[j]._owner][temp[j + 1]._owner] = true;
                                                        }
                                                    }


                                                    if (!tokensAtAddress.hasOwnProperty(temp[j]._owner)) {
                                                        let t;
                                                        t = [];

                                                        tokensAtAddress[temp[j]._owner] = t;
                                                    }


                                                    let t2 = tokensAtAddress[temp[j]._owner];
                                                    t2.push(value);
                                                    tokensAtAddress[temp[j]._owner] = t2;
                                                }
                                            }


                                        })
                                        .then(() => {

                                        })
                                );
                            });

                        }, Promise.resolve());


                    })


            );

            Promise.all(promises).then(() => {

                let parentAdd;
                contract.methods.getSingleTokenDetails(tokenkeys[0]).call({ from: accounts[0], gas: 3000000 })
                    .then((result) => {
                        parentAdd = result.CompleteHistoryOfToken[0]._owner
                        ownerCompleteInfo[parentAdd].name = 'root'
                    }).then(() => {

                        // console.log(relations[parentAdd]);
                        console.log(ownerCompleteInfo);
                        let json = {}
                        console.log(relations);
                        this.populate(parentAdd, json, 'null');
                        console.log(json);

                    })




            })
        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log(error);
        }
    };

    populate = (address, json, parent) => {

        console.log(address);
        console.log(relations[address]);
        if (typeof relations[address] === "undefined") {

            // json['name'] = 'demo'
            // json['address'] = address;

            json['name'] = ownerCompleteInfo[address].name;
            json['value'] = ownerCompleteInfo[address].funds;
            json['parent'] = parent;
            console.log(json);
            return json;
        }
        else {

            let arr = relations[address];
            json['childern'] = [];
            for (let i = 0; i < relations[address].length; i++) {

                json['name'] = ownerCompleteInfo[address].name;
                json['value'] = ownerCompleteInfo[address].funds;
                json['parent'] = parent;
                json['childern'].push(this.populate(arr[i], {}, address));
                console.log(json);

            }
            return json;
        }

    }
    handleClick = (name) => {
        console.log("Token name:", name);
        this.setState({ drawerVisible: true });
    }
    handleToggleDrawer = (bool) => {
        this.setState({ drawerVisible: bool });
    }
    handleSearchToken = (e) => {
        var name = e.target.name;
        if (e.target.value != '')
            var data = tokenArray.filter((t) => { return t.includes(e.target.value) });
        else data = tokenArray;
        this.setState({ [name]: e.target.value, tokenArray: data })
    }
    render() {
        function NodeLabel(props) {
            const { className, nodeData } = props;
            return <div className={className}>
                <h4>{nodeData.name}</h4>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => props.handleClick(nodeData.name)}>{nodeData.value}</div>
            </div>;
        }
        return (
            <div className="tree">
                <div id="treeWrapper" style={{ width: '100%', height: '80vh' }}>
                    <Drawer
                        className="token-drawer-wrapper"
                        title="Tokens"
                        placement="right"
                        closable={true}
                        onClose={() => this.handleToggleDrawer(false)}
                        visible={this.state.drawerVisible}>
                        <div className="token-drawer">
                            <Input value={this.state.searchTokenTxt} onChange={this.handleSearchToken} name="searchTokenTxt" className="search-tree-token" placeholder="Enter token key" prefix={<SearchOutlined />} />
                            {this.state.tokenArray && this.state.tokenArray.map((token) => {
                                return <div className='token-array'>{token}</div>
                            })}
                        </div>
                    </Drawer>
                    {/* <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card> */}
                    <Tree data={myTreeData}
                        initialDepth={3}
                        shouldCollapseNeighborNodes={true}
                        translate={{ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 }}
                        allowForeignObjects
                        nodeLabelComponent={{
                            render: <NodeLabel handleClick={this.handleClick} className='myLabelComponentInSvg' />,
                            foreignObjectWrapper: {
                                y: 5
                            }
                        }} />

                </div>
            </div>
        )
    }
}

export default RTree;