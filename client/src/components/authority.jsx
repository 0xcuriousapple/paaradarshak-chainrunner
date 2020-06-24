import React from 'react';
import { Input, Button, AutoComplete, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './home.scss';
import memoize from "memoize-one";

const labels = [

]

const mapAuthNametoAddress = {}
class Authority extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedauthority: '', accounts: [], show: false };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e, name) => {

        this.setState({ [name]: e });

    }
    // labels.push({ 'value': result[i] })
    componentDidMount = async () => {
        const { accounts, contract } = this.props.web3;
        try {
            this.filter(this.props.web3.accounts);
            contract.methods.getAllListedAuthAddress().call({ from: accounts[0], gas: 3000000 })
                .then((result) => {

                    let i;
                    console.log(result);
                    for (i = 0; i < result.length; i++) {
                        let temp = result[i];
                        contract.methods.getSingleAuthDetails(temp).call({ from: accounts[0], gas: 3000000 })
                            .then((result) => {
                                labels.push({ 'value': result['name'] })
                                mapAuthNametoAddress[result['name']] = temp;
                            })

                    }

                })
        } catch (error) {
            // Catch any errors for any of the above operations.
            message.error('Sorry TX was not successful Please refer console')
            console.log('sad');
            console.error(error);
        }
    };

    filter = memoize(
        (accounts) => { this.setState({ accounts: accounts }) }
    );

    handleSubmit = () => {

        // const { accounts, contract } = this.props.web3;

        // // this is called when submit Btn is clicked
        console.log(this.state.accounts[0]);
        console.log(this.state.accounts);
        console.log(mapAuthNametoAddress['Root']);
        console.log(this.state.accounts[0] == mapAuthNametoAddress['Root']);
        if (this.state.accounts[0] == mapAuthNametoAddress['Root']) {

            // console.log(this.state.accounts);
            // console.log(mapAuthNametoAddress['Root']);
            this.props.handleChangeMenu('5');
        }
        else {

            console.log(this.state.accounts);
            console.log(mapAuthNametoAddress['Root']);
            console.log(this.state.accounts[0] == mapAuthNametoAddress['Root']);
            this.props.handleChangeMenu('6');
        }

    }
    render() {
        return (
            <div className="authority-wrapper">
                <div className="authority">
                    Please note that you will not be able to call dedicated functions of authorities unless your wallet address is registered authority address.
                    {/* <div className="authority-title">Enter your name</div><br /> */}
                    {/* <AutoComplete
                        size="large"
                        style={{
                            width: '100%',
                        }}
                        options={labels}
                        placeholder="Name"
                        prefix={<UserOutlined />}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        value={this.state.selectedauthority}
                        onChange={(e) => this.handleChange(e, 'selectedauthority')}
                        name="username" /><br /><br /> */}
                    <Button type="primary" size="large" onClick={this.handleSubmit} block>SUBMIT</Button>
                    {/* <Button type="link" onClick={() => this.props.handleChangeMenu('5')}>Don't have account? Register</Button> */}
                </div>
            </div>
        );
    }
}

export default Authority;