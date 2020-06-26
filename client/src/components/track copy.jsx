import React from 'react';
import { Timeline, Input, Button, Col, Row } from 'antd';
import { message } from 'antd';



class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timelineVisible: 'none', tokenSearch: '', trackArray: [] }
    }
    handleChange = e => {
        var name = e.target.name;
        this.setState({ [name]: e.target.value });
    }
    handleTrack = () => {

        try {
            const { accounts, contract } = this.props.web3;
            let history;
            contract.methods.getSingleTokenDetails(this.state.tokenSearch).call({ from: accounts[0], gas: 3000000, })
                .then((result) => {
                    history = result[0]
                    let i = 0;
                    console.log(history);
                    let singleinstance;
                    let temp = [];
                    for (i = 0; i < history.length; i++) {
                        singleinstance = history[i];
                        //0xd3033d0ae74eda8e29ea100d113c77db67518955a239113006a48cbd67df847b

                        if (singleinstance[1] == '0') {
                            temp.push({
                                'type': singleinstance[1],
                                'value': singleinstance[0],
                                'donor': singleinstance[2],
                                'add': singleinstance[4],
                            })
                        }
                        else if (singleinstance[1] == '1') {
                            temp.push({
                                'type': singleinstance[1],
                                'value': singleinstance[0],
                                'name': singleinstance[2],
                                'purpose': singleinstance[3],
                                'add': singleinstance[4],
                                'child': (singleinstance[5] == '0x0000000000000000000000000000000000000000000000000000000000000000') ? 'NA' : singleinstance[5],

                            })
                        }
                        else if (singleinstance[1] == '2') {
                            temp.push({
                                'type': singleinstance[1],
                                'value': singleinstance[0],
                                'leaf': singleinstance[2],
                                'result': singleinstance[3],
                                'add': singleinstance[4],
                                'child': (singleinstance[5] == '0x0000000000000000000000000000000000000000000000000000000000000000') ? 'NA' : singleinstance[5],

                            })
                        }

                    }
                    this.setState({ 'trackArray': temp });
                })

            console.log(this.state.trackArray);



        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }
        this.setState({ timelineVisible: 'inline' })
    }
    render() {
        return (
            <div className="track">
                <Input className='token-inp' name='tokenSearch' value={this.state.value} onChange={this.handleChange} placeholder='Enter token to track' /><br />
                <Button className='track-btn' type="primary" onClick={this.handleTrack}>Track</Button>
                <Row justify="space-around" align="middle">
                    <Col md={12} sm={16} xs={20}>
                        <Timeline style={{ display: this.state.timelineVisible }} mode={window.innerWidth < 768 ? 'left' : 'alternate'}>
                            {this.state.trackArray && this.state.trackArray.map((t) => {
                                return <Timeline.Item>
                                    <div className="card" style={{}}>
                                        <div className="card-title">
                                            {(t.type == '1') ? (
                                                <div>
                                                    <b>Transfer | Authority: {t.name}</b>
                                                    <hr />
                                                    Address of Authority: {t.add}<br />
                                                    <strong>Total Value: {t.value}<br />
                                                    Proposal for Utilization in: {t.purpose} <br /></strong>
                                                    Child Token: {t.child}
                                                </div>
                                            ) : (
                                                    (t.type == '2') ? (

                                                        <div>
                                                            <b>Result | Paid to : {t.leaf}</b>
                                                            <hr />
                                                    Payee address : {t.add}<br />
                                                            <strong>Total Value: {t.value}<br />
                                                    Utilized in: {t.result} <br /></strong>
                                                    Child Token: {t.child}
                                                        </div>
                                                    ) : (< div >


                                                        <b>Donation | By : {t.donor}</b>
                                                        <hr />
                                                    Address of donor: {t.add}<br />
                                                        <strong>Total Value: {t.value}<br />

                                                        </strong>

                                                    </div>)

                                                )}

                                        </div>
                                    </div>
                                </Timeline.Item>
                            })}
                        </Timeline>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default Track;