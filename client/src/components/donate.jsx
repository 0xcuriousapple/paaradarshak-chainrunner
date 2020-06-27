import React from 'react';
import { Input, Button, AutoComplete, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import './home.scss';
import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import { Result } from 'antd';
import Logo from './maticlogo.png';
import emailjs from "emailjs-com"
import { Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;
class Donate extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '', value: '', success: false, donationkey: null };
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange = (e, id) => {
		this.setState({ [id]: e.target.value });
	};

	handleChangeNumber = e => {
		let value = e.target.value;

		if (!Number(value)) {
			return;
		}
		this.setState({
			value: value
		});
	}

	toggleSuccess = () => {

		this.setState({ name: '', value: '', success: !this.state.success });
	}


	handleSubmit = () => {
		// this is called when submit Btn is clicked

		let uhash = sha256(this.state.name + this.state.value + Date.now());
		uhash = uhash.toString(CryptoJS.enc.Hex);

		// contract.methods.donate().send({ from: accounts[0], gas: 3000000, value: this.state.value })
		// .then(() => {
		// 	contract.methods.createToken("0x" + uhash, this.state.value, this.state.name).send({ from: accounts[0] })
		// 		.then((receipt) => {
		// 			message.success('Donation successful');
		// 			console.log(receipt)
		// 			this.setState({ success: true, donationkey: "0x" + uhash })
		// 		})
		// 		.catch((err) => message.error('Sorry your donation was not successful Please try again'))
		// })
		const { accounts, contract } = this.props.web3;
		contract.methods.donate("0x" + uhash, this.state.value, this.state.name).send({ from: accounts[0], gas: 3000000, value: this.state.value })
			.then((receipt) => {

				message.success('Donation successful');
				console.log(receipt)
				this.setState({ success: true, donationkey: "0x" + uhash })
			})
			.catch((err) => message.error('Sorry your donation was not successful Please try again'))

	};
	render() {
		return (
			<div className="donation-wrapper">

				{this.state.success ? (<Result
					status="success"
					title={`We have received your donation with Token key `}
					visible={this.state.success}
					// subTitle={"Use this token key to track your donation, Thank you "}
					extra={<Button type="primary" onClick={this.toggleSuccess}>Go Back</Button>}
				>
					<Paragraph copyable>{this.state.donationkey}</Paragraph>

				</Result>) :

					(
						<div className="donation">
							<div className="donation-title">Donate</div>
							<br />
							<br />
							<Input
								name="name"
								label={<span>Name</span>}

								placeholder="Enter your name"
								rules={[
									{
										required: true,
										message: 'Please input your Name!',
										whitespace: true,
									},
								]}
								onChange={(e) => this.handleChange(e, 'name')}
								value={this.state.name}
							/>
							<br />
							<br />

							<Input
								name="value"
								addonAfter={<img src={Logo} style={{ height: '20px', width: 'auto' }} />}
								placeholder="Enter Amount in Matic Tokens"
								onChange={(e) => this.handleChangeNumber(e)}
								value={this.state.value}
							/>
							<br />
							<br />
							<Button
								type="primary"
								size="large"
								onClick={this.handleSubmit}
								block
							>
								Proceed
					</Button>
						</div>

					)


				}

			</div>
		);
	}
}

export default Donate;
