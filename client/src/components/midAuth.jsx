import React from 'react';
import { Modal, Button, Row, Col, AutoComplete, Table, message, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";

const data = [

    // { key: 2, purpose: 'dskjhd 2', value: 315, authority: 'sdfdf', result: '', address: ''},
    // { key: 3, purpose: 'dskjhd 3', value: 5885, authority: 'sddfs', result: '', address: ''}
]
let tokenkeys;
// const authorities = [
//     { value: 'user1' },
//     { value: 'aman123' },
//     { value: 'user2' }
// ]
// data: data, purpose: '', value: '', authority: '',
// result: '', address: '', authName: '', authAddr: '',
// transferVisible: false, transferValue: '', transferPurpose: '', transferAuthority: '',
// uploadVisible: false, uploadResult: '', uploadAddr: '',
// labels: [],
// mapAuthNametoAddress: {}, tokensAtThisAddress: {}
class MidAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], purpose: '', fund: '', rowkey: '',
            nextpurpose: ' ', transfervalue: '', nextAuth: '',
            reason: ' ', payeeaddress: '', paymentValue: '', payeename: '',
            authName: '', authAddr: '',
            transferVisible: false,
            paymentVisible: false,
            labels: [],
            mapAuthNametoAddress: {}, tokensAtThisAddress: {}
        }
    }

    call = () => {
        const { accounts, contract } = this.props.web3;

        let initialState = {
            data: [], purpose: '', fund: '', rowkey: '',
            nextpurpose: ' ', transfervalue: '', nextAuth: '',
            reason: ' ', payeeaddress: '', paymentValue: '', payeename: '',
            authName: '', authAddr: '',
            transferVisible: false,
            paymentVisible: false,
            labels: [],
            mapAuthNametoAddress: {}, tokensAtThisAddress: {}
        };
        this.setState(initialState);
        console.log(accounts[0]);
        try {


            let l = [];
            let map = {};
            contract.methods.getAllListedAuthAddress().call({ from: accounts[0], gas: 3000000 })
                .then((result) => {

                    let i;
                    console.log(result);
                    for (i = 0; i < result.length; i++) {
                        let temp = result[i];
                        contract.methods.getSingleAuthDetails(temp).call({ from: accounts[0], gas: 3000000 })
                            .then((result) => {
                                l.push({ 'value': result['name'] })
                                map[result['name']] = temp;
                            })

                    }

                })
            this.setState({ labels: l })
            this.setState({ mapAuthNametoAddress: map })

            contract.methods.getAllTokenKeys().call({ from: accounts[0], gas: 3000000 })
                .then((result) => {
                    tokenkeys = result
                })
                .then(() => {
                    let i = 0;
                    let promises = [];
                    for (i = 0; i < tokenkeys.length; i++) {
                        let value = tokenkeys[i];
                        promises.push(
                            contract.methods.getSingleTokenDetails(value).call({ from: accounts[0], gas: 3000000 })
                                .then((result) => {

                                    console.log(result);
                                    let temp
                                    temp = result.CompleteHistoryOfToken;
                                    //console.log(result.CompleteHistoryOfToken);
                                    if (accounts[0].toLowerCase() == (temp[temp.length - 1]._owner).toLowerCase()) {

                                        console.log(temp)
                                        let t = this.state.tokensAtThisAddress;
                                        if (!t.hasOwnProperty(temp[temp.length - 1].purpose)) {
                                            t[temp[temp.length - 1].purpose] = [];
                                        }
                                        t[temp[temp.length - 1].purpose].push({ "key": value, "value": temp[temp.length - 1].value });
                                        this.setState({ tokensAtThisAddress: t });
                                    }

                                }));


                    }
                    Promise.all(promises)
                        .then(() => {
                            console.log(this.state.tokensAtThisAddress);


                            for (var key in this.state.tokensAtThisAddress) {
                                if (this.state.tokensAtThisAddress.hasOwnProperty(key)) {
                                    let total = 0;
                                    let i = 0;
                                    let perpurposeT = this.state.tokensAtThisAddress[key];
                                    for (i = 0; i < perpurposeT.length; i++) {
                                        total = total + parseInt(perpurposeT[i].value);
                                    }

                                    let d = this.state.data;
                                    d.push({ 'key': 1, 'purpose': key, 'value': total })
                                    this.setState({ 'data': [...d] })
                                }
                            }

                        })

                })





        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }
    }
    componentDidMount = async () => {
        const { accounts, contract } = this.props.web3;

        let initialState = {
            data: [], purpose: '', fund: '', rowkey: '',
            nextpurpose: ' ', transfervalue: '', nextAuth: '',
            reason: ' ', payeeaddress: '', paymentValue: '', payeename: '',
            authName: '', authAddr: '',
            transferVisible: false,
            paymentVisible: false,
            labels: [],
            mapAuthNametoAddress: {}, tokensAtThisAddress: {}
        };
        this.setState(initialState);
        console.log(accounts[0]);
        try {


            let l = [];
            let map = {};
            contract.methods.getAllListedAuthAddress().call({ from: accounts[0], gas: 3000000 })
                .then((result) => {

                    let i;
                    console.log(result);
                    for (i = 0; i < result.length; i++) {
                        let temp = result[i];
                        contract.methods.getSingleAuthDetails(temp).call({ from: accounts[0], gas: 3000000 })
                            .then((result) => {
                                l.push({ 'value': result['name'] })
                                map[result['name']] = temp;
                            })

                    }

                })
            this.setState({ labels: l })
            this.setState({ mapAuthNametoAddress: map })

            contract.methods.getAllTokenKeys().call({ from: accounts[0], gas: 3000000 })
                .then((result) => {
                    tokenkeys = result
                })
                .then(() => {
                    let i = 0;
                    let promises = [];
                    for (i = 0; i < tokenkeys.length; i++) {
                        let value = tokenkeys[i];
                        promises.push(
                            contract.methods.getSingleTokenDetails(value).call({ from: accounts[0], gas: 3000000 })
                                .then((result) => {

                                    console.log(result);
                                    let temp
                                    temp = result.CompleteHistoryOfToken;
                                    //console.log(result.CompleteHistoryOfToken);
                                    if (accounts[0].toLowerCase() == (temp[temp.length - 1]._owner).toLowerCase()) {

                                        console.log(temp)
                                        let t = this.state.tokensAtThisAddress;
                                        if (!t.hasOwnProperty(temp[temp.length - 1].purpose)) {
                                            t[temp[temp.length - 1].purpose] = [];
                                        }
                                        t[temp[temp.length - 1].purpose].push({ "key": value, "value": temp[temp.length - 1].value });
                                        this.setState({ tokensAtThisAddress: t });
                                    }

                                }));


                    }
                    Promise.all(promises)
                        .then(() => {
                            console.log(this.state.tokensAtThisAddress);


                            for (var key in this.state.tokensAtThisAddress) {
                                if (this.state.tokensAtThisAddress.hasOwnProperty(key)) {
                                    let total = 0;
                                    let i = 0;
                                    let perpurposeT = this.state.tokensAtThisAddress[key];
                                    for (i = 0; i < perpurposeT.length; i++) {
                                        total = total + parseInt(perpurposeT[i].value);
                                    }

                                    let d = this.state.data;
                                    d.push({ 'key': 1, 'purpose': key, 'value': total })
                                    this.setState({ 'data': [...d] })
                                }
                            }

                        })

                })





        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }
    };
    handleAddAuth = () => {
        console.log(this.state.authName, this.state.authAddr);
        try {
            const { accounts, contract } = this.props.web3;
            contract.methods.addAuthority(this.state.authName, this.state.authAddr).send({ from: accounts[0], gas: 3000000 })
                .then((receipt) => {

                    message.success('New Authority Added Succesfully');
                    console.log(receipt)
                    let t = this.state.labels
                    t.push({ 'value': this.state.authName })
                    this.setState({ labels: t })

                    let t2 = this.state.mapAuthNametoAddress
                    t2[this.state.authName] = this.state.authAddr
                    this.setState({ mapAuthNametoAddress: t2 })

                    this.setState({ authName: '', authAddr: '' });

                })

        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }
        this.toggleModalVisible(false, 'authVisible')
    }
    handleTransfer = (record) => {
        console.log(record);
        this.setState({ transferVisible: true, purpose: record.purpose, funds: record.value, rowkey: record.key });
    }
    handlePayment = (record) => {
        console.log(record);
        this.setState({ paymentVisible: true, purpose: record.purpose, funds: record.value, rowkey: record.key });
    }
    refreshPage() {
        window.location.reload(false);
    }
    handleSubmitTransfer = () => {
        try {
            const { accounts, contract } = this.props.web3;
            if (this.state.transferValue > this.state.tokensAtThisAddress[this.state.purpose]) { message.error('Insufficient Balance'); }
            else {
                let i = 0
                let breakp;
                let temp = 0;
                let aim = this.state.transferValue;
                let currentbalance = this.state.funds;

                let y = this.state.tokensAtThisAddress[this.state.purpose];
                for (i = 0; i < y.length; i++) {

                    temp = temp + parseInt(y[i].value);
                    console.log(temp)
                    if (temp >= aim) {
                        breakp = i;
                        break;
                    }
                }
                console.log(temp)


                if (temp == aim) {

                    let k;
                    let promises = [];
                    for (k = 0; k <= breakp; k++) {
                        promises.push(
                            new Promise((resolve, reject) => {
                                contract.methods.transferToken(y[k].key, '1', this.state.nextAuth, this.state.nextpurpose, this.state.mapAuthNametoAddress[this.state.nextAuth]).send({ from: accounts[0], gas: 3000000 })
                                    .then((receipt) => {
                                        if (k == 0) {
                                            let newbal = this.state.funds - parseInt(aim);
                                            let d = this.state.data;
                                            d[parseInt(this.state.rowkey) - 1].value = newbal
                                            this.setState({ data: [d] });
                                            console.log(receipt)

                                        }
                                    }).then(() => { resolve(); })
                            }))
                    }

                    Promise.all(promises).then(() => { this.call(); this.setState({ transferVisible: false }); })


                }
                else if (temp > aim) {
                    message.success('There will be 2 TXs as we have to break the token in this case');
                    let t = temp - aim;
                    let requiredvaluedtoken = y[breakp].value - t;
                    let uhash = sha256(accounts[0] + requiredvaluedtoken + Date.now());
                    uhash = uhash.toString(CryptoJS.enc.Hex);


                    contract.methods.breakToken(y[breakp].key, requiredvaluedtoken, "0x" + uhash).send({ from: accounts[0], gas: 3000000 })
                        .then(() => {
                            let newbal = this.state.funds - parseInt(aim);

                            let k;
                            let promises = [];
                            for (k = 0; k <= breakp; k++) {
                                promises.push(
                                    new Promise((resolve, reject) => {
                                        contract.methods.transferToken(y[k].key, '1', this.state.nextAuth, this.state.nextpurpose, this.state.mapAuthNametoAddress[this.state.nextAuth]).send({ from: accounts[0], gas: 3000000 })
                                            .then((receipt) => {

                                                if (k == 0) {
                                                    let d = this.state.data;
                                                    d[parseInt(this.state.rowkey) - 1].value = newbal
                                                    this.setState({ data: [d] });
                                                    console.log(receipt)
                                                }

                                            }).then(() => {
                                                resolve();
                                            })
                                    }))
                            }

                            Promise.all(promises).then(() => { this.call(); this.setState({ transferVisible: false }); })
                        })

                }

            }



        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }



        // if (false) {
        //     // if the operation is unsuccessful
        //     message.error('The Operation was unsuccessful');
        // }


    }

    handlePaymentTransfer = () => {
        try {
            const { accounts, contract } = this.props.web3;
            if (parseInt(this.state.paymentValue) > this.state.tokensAtThisAddress[this.state.purpose]) { message.error('Insufficient Balance'); }
            else {
                let i = 0
                let breakp;
                let temp = 0;
                let aim = parseInt(this.state.paymentValue);

                let y = this.state.tokensAtThisAddress[this.state.purpose];
                for (i = 0; i < y.length; i++) {

                    temp = temp + parseInt(y[i].value);
                    console.log(temp)
                    if (temp >= aim) {
                        breakp = i;
                        break;
                    }
                }
                console.log(this.state.paymentValue);


                if (temp == aim) {


                    let k;
                    console.log(y);
                    let promises = [];
                    for (k = 0; k <= breakp; k++) {
                        promises.push(
                            new Promise((resolve, reject) => {
                                contract.methods.paymentToLeaf(y[k].key, this.state.payeeaddress, this.state.payeename, this.state.reason).send({ from: accounts[0], gas: 3000000, value: y[k].value })
                                    .then(() => {

                                        if (k == 0) {
                                            let newbal = this.state.funds - parseInt(aim);
                                            let d = this.state.data;
                                            d[parseInt(this.state.rowkey) - 1].value = newbal
                                            this.setState({ data: [d] });

                                        }
                                    }).then(() => { resolve(); })
                            }));
                    }
                    Promise.all(promises).then(() => { this.call(); this.setState({ paymentVisible: false }); })



                }
                else if (temp > aim) {
                    message.success('There will be 2 TXs as we have to break the token in this case');
                    let t = temp - aim;
                    let requiredvaluedtoken = y[breakp].value - t;
                    console.log(requiredvaluedtoken);
                    let uhash = sha256(accounts[0] + requiredvaluedtoken + Date.now());
                    uhash = uhash.toString(CryptoJS.enc.Hex);


                    contract.methods.breakToken(y[breakp].key, requiredvaluedtoken, "0x" + uhash).send({ from: accounts[0], gas: 3000000 })
                        .then(() => {
                            let newbal = this.state.funds - parseInt(aim);

                            let k;
                            let promises = [];
                            for (k = 0; k <= breakp; k++) {
                                let value = y[k];
                                if (k == breakp) value = t;
                                console.log(t);
                                promises.push(
                                    new Promise((resolve, reject) => {
                                        contract.methods.paymentToLeaf(y[k].key, this.state.payeeaddress, this.state.payeename, this.state.reason).send({ from: accounts[0], gas: 3000000, value: value })
                                            .then(() => {

                                                if (k == 0) {
                                                    let newbal = this.state.funds - parseInt(aim);
                                                    let d = this.state.data;
                                                    d[parseInt(this.state.rowkey) - 1].value = newbal
                                                    this.setState({ data: [d] });

                                                }
                                            }).then(() => { resolve(); })
                                    }));
                            }

                            Promise.all(promises).then(() => { this.call(); this.setState({ paymentVisible: false }); })

                        })

                }

            }



        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }



    }
    handleChange = (e, name) => {
        if (name == 'nextAuth')
            this.setState({ [name]: e });
        else
            this.setState({ [name]: e.target.value })
    }
    toggleModalVisible = (bool, type) => {
        this.setState({ [type]: bool })
    }
    render() {
        const columns = [
            {
                title: 'Purpose',
                dataIndex: 'purpose',
                key: 'purpose',
            },
            {
                title: 'Remaining Funds',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: 'Actions',
                key: 'Actions',
                render: (text, record) => {
                    return <div >
                        <Button size="small" className="buttons" type="primary" onClick={() => this.handleTransfer(record)}>Transfer</Button>
                        <Button size="small" className="buttons" type="primary" onClick={() => this.handlePayment(record)}>Payment</Button>
                    </div>
                }
            },
        ];
        return (
            <div className="root-auth">
                <Row justify="space-around" align="middle">
                    <Col xs={23} sm={22} md={20}>

                        <Table title={() => <div style={{ textAlign: 'left', fontSize: '20px', fontFamily: '"Open Sans", sans-serif' }}>{this.props.midAuthName}</div>} bordered style={{ overflowX: 'auto' }} columns={columns} dataSource={this.state.data} /><br /><br />
                        <Button type="primary" onClick={() => this.toggleModalVisible(true, 'authVisible')}>Add Authority</Button>
                    </Col>
                </Row>

                <Modal
                    title='Transfer'
                    visible={this.state.transferVisible}
                    onOk={this.handleSubmitTransfer}
                    onCancel={() => this.toggleModalVisible(false, 'transferVisible')}
                >
                    <AutoComplete
                        style={{
                            width: '100%',
                        }}
                        options={this.state.labels}
                        placeholder="Payee Authority"
                        prefix={<UserOutlined />}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        value={this.state.nextAuth}
                        onChange={(e) => this.handleChange(e, 'nextAuth')}
                        name='nextAuth' /><br /><br />
                    <Input name='transferPurpose' onChange={(e) => this.handleChange(e, 'nextpurpose')} placeholder='Purpose of this transfer' /><br /><br />
                    <Input name='transferValue' onChange={(e) => this.handleChange(e, 'transferValue')} placeholder='Value in Wei' /><br /><br />
                </Modal>

                <Modal
                    title='Payment'
                    visible={this.state.paymentVisible}
                    onOk={this.handlePaymentTransfer}
                    onCancel={() => this.toggleModalVisible(false, 'paymentVisible')}
                >
                    <Input name='payeename' onChange={(e) => this.handleChange(e, 'payeename')} placeholder='Payee Name' /><br /><br />
                    <Input name='Reason' onChange={(e) => this.handleChange(e, 'reason')} placeholder='Payment Reason' /><br /><br />
                    <Input name='payeeaddress' onChange={(e) => this.handleChange(e, 'payeeaddress')} placeholder='Payee Address' /><br /><br />
                    <Input name='paymentValue' onChange={(e) => this.handleChange(e, 'paymentValue')} placeholder='Value in Wei' /><br /><br />
                </Modal>

                <Modal
                    title='Add Authority'
                    visible={this.state.authVisible}
                    onOk={this.handleAddAuth}
                    onCancel={() => this.toggleModalVisible(false, 'authVisible')}
                >
                    <Input name='authName' onChange={(e) => this.handleChange(e, 'authName')} placeholder='Name' /><br /><br />
                    <Input name='authAddr' onChange={(e) => this.handleChange(e, 'authAddr')} placeholder='Address' /><br /><br />
                </Modal>
            </div>
        )
    }
}

export default MidAuth;