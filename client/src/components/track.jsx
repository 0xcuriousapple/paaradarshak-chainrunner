import React from 'react';
import { Timeline, Input, Button, Col, Row } from 'antd';
import { message } from 'antd';
import Q from 'q';
import { Graph } from "react-d3-graph";
import { Table, Tag, Space } from 'antd';
import { Typography, List } from 'antd';
const { Paragraph } = Typography;


const { Title, Text } = Typography;
const myConfig = {
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    directed: true,
    height: "300",
    width: "750",
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

const columns = [
    {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
        render: text => <a>{text}</a>,
    },
    {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
    },
    {
        title: 'Purpose',
        dataIndex: 'purpose',
        key: 'purpose',

    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },


];
const columns2 = [
    {
        title: 'Donor, Payer, Tax Payer',
        dataIndex: 'donor',
        key: 'donor',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Total Payment',
        dataIndex: 'totalfunds',
        key: 'totalfunds',
    },
    {
        title: 'Child Tokens',
        dataIndex: 'childtokens',
        key: 'childtokens',
        render: list => <List
            size="small"
            dataSource={list}
            renderItem={item => <List.Item>  <Paragraph copyable>{item}</Paragraph></List.Item>}
        />,
    },



];

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timelineVisible: 'none', tokenSearch: '', trackArray: [], totalcalls: 0, data: {
                nodes: [{
                    id: 'Please enter your token key', x: 375,
                    y: 30
                }], links: []
            },
            donorname: "NA",
            totalfunds: 0,
            childTokenList: [],
            infotabledata: [],
            tabledata: [],
        }
    }
    handleChange = e => {
        var name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    recursion = (contract, accounts, data, linkvalue, add, ifnodeexist, fundsatnode) => {
        // console.log('asda');
        // this.count++;

        if (add != '0x0000000000000000000000000000000000000000000000000000000000000000') {


            if (Object.keys(ifnodeexist).length != 0) {
                let t = this.state.childTokenList;
                t.push(add);
                this.setState({ childTokenList: t });

            }
            contract.methods.getSingleTokenDetails(add).call({ from: accounts[0], gas: 3000000, })
                .then((result) => {
                    let history = result[0]
                    let i = 0;
                    // console.log(history);
                    let singleinstance;
                    let parent = 'null'
                    console.log(history);

                    for (i = 0; i < history.length; i++) {
                        singleinstance = history[i];
                        //0xd3033d0ae74eda8e29ea100d113c77db67518955a239113006a48cbd67df847b

                        if (!ifnodeexist.hasOwnProperty(singleinstance[2])) {
                            if (singleinstance[1] == 0) {
                                data.nodes.push({
                                    'id': singleinstance[2],
                                    'symbolType': "diamond",
                                    x: 375,
                                    y: 5,
                                })
                            }
                            else if (singleinstance[1] == 1) {
                                data.nodes.push({
                                    'id': singleinstance[2]

                                })
                            }
                            else if (singleinstance[1] == 2) {
                                data.nodes.push({
                                    'id': singleinstance[2],

                                })
                            }
                            ifnodeexist[singleinstance[2]] = true;
                            fundsatnode[singleinstance[2]] = 0;
                        }
                        let j = i;
                        let flag = 1;
                        let temp = history;

                        if (j < temp.length - 1 && temp[j].nameOfOwner == temp[j + 1].nameOfOwner) {
                            flag = 0;
                        }
                        if (flag == 1) {

                            fundsatnode[singleinstance[2]] = parseInt(fundsatnode[singleinstance[2]]) + parseInt(singleinstance.value);
                        }


                        if (i < temp.length - 1) {
                            if (temp[j].nameOfOwner != temp[j + 1].nameOfOwner) {

                                let link = temp[j].nameOfOwner + temp[j + 1].nameOfOwner;
                                if (linkvalue.hasOwnProperty(link)) {

                                    linkvalue[link].totalvalue = parseInt(linkvalue[link].totalvalue) + parseInt(temp[j + 1].value);
                                    if (!linkvalue[link].purposes.hasOwnProperty(temp[j + 1].purpose)) linkvalue[link].purposes[temp[j + 1].purpose] = 0;
                                    linkvalue[link].purposes[temp[j + 1].purpose] = parseInt(linkvalue[link].purposes[temp[j + 1].purpose]) + parseInt(temp[j + 1].value);

                                }
                                else {

                                    linkvalue[link] = {
                                        'source': temp[j].nameOfOwner,
                                        'target': temp[j + 1].nameOfOwner,
                                        'totalvalue': parseInt(temp[j + 1].value),
                                        'purposes': {
                                            [temp[j + 1].purpose]: parseInt(temp[j + 1].value)
                                        }
                                    }
                                }
                            }

                        }
                    }

                    this.recursion(contract, accounts, data, linkvalue, singleinstance[5], ifnodeexist, fundsatnode);
                });

            // this.count--;
            // console.log(this.count);
            // if (this.count === 0 && callback) callback();


        }

    }
    handleTrack = () => {
        this.setState({ childTokenList: [] })
        let graph = {
            nodes: [], links: []
        }

        try {
            const { accounts, contract } = this.props.web3;
            let linkvalue = {}
            let startadd = this.state.tokenSearch
            let fundsatnode = {}
            this.setState({
                data: {
                    nodes: [{
                        id: 'Loading...', x: 375,
                        y: 30
                    }], links: []
                }
            })
            this.recursion(contract, accounts, graph, linkvalue, startadd, {}, fundsatnode);


            setTimeout(() => {
                console.log(linkvalue);
                let tempdatatable = [];
                let infotable = []
                let i = 0;
                for (const [key, value] of Object.entries(linkvalue)) {
                    let label;
                    label = JSON.stringify(value.purposes);
                    let purp = value.purposes
                    let totalforonelink = 0;
                    for (const [k, v] of Object.entries(purp)) {
                        tempdatatable.push({
                            key: `${i}`,
                            from: value.source,
                            to: value.target,
                            purpose: k,
                            amount: v,
                        });
                        totalforonelink += v;
                    }
                    graph.links.push({
                        source: value.source,
                        target: value.target,
                        label: totalforonelink,
                    });
                }

                this.setState({ data: graph });
                this.setState({ fundsatnode: fundsatnode });

                this.setState({ donorname: Object.keys(fundsatnode)[0] });
                this.setState({ totalfunds: fundsatnode[Object.keys(fundsatnode)[0]] });

                this.setState({
                    infotabledata: [{
                        key: "1",
                        donor: this.state.donorname,
                        totalfunds: this.state.totalfunds,
                        childtokens: this.state.childTokenList,
                    }]
                })
                this.setState({ tabledata: tempdatatable });
                console.log(graph);
                console.log(fundsatnode)
            }, 2000);
            console.log(this.state.trackArray);



        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }

    }
    render() {

        return (
            <div>
                <div className="track">


                    <Input className='token-inp' name='tokenSearch' value={this.state.value} onChange={this.handleChange} placeholder='Enter token to track' /><br />
                    <Button className='track-btn' type="primary" onClick={this.handleTrack}>Track</Button>

                    <Graph
                        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                        data={this.state.data}
                        config={myConfig}
                    // onClickNode={this.onClickNode}
                    // onClickLink={this.onClickLink}
                    />
                </div>
                <div className="trackdata">
                    <div className="data-title">
                        {/* <Text strong>Tracking Details</Text> */}
                    </div>
                    <Table columns={columns2} dataSource={this.state.infotabledata} />
                    <Table columns={columns} dataSource={this.state.tabledata} />
                </div>
            </div >
        )
    }
}

export default Track;