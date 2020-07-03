import React from 'react';
import { Input, Button, AutoComplete, message, Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import './home.scss';
import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import { Result } from 'antd';
import Logo from './maticlogo.png';
import emailjs from "emailjs-com"
import { Spin } from 'antd';

const { Paragraph } = Typography;
class Campaign extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '', value: '', success: false, donationkey: null, owner: "", desc: "", loading: false };
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange = (e, id) => {
		this.setState({ [id]: e.target.value });
	};
	componentDidMount = async () => {

		const { contract, accounts } = this.props.web3;
		contract.methods.getFundInfo().call({ from: accounts[0], gas: 3000000 })
			.then((result) => {
				this.setState({ owner: result.owner, desc: result.description })
			})

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
		try {
			this.setState({ loading: true });
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

					message.success('Payment successful');
					console.log(receipt)
					this.setState({ success: true, donationkey: "0x" + uhash })
					this.setState({ loading: false });
				})
				.catch((err) => {
					message.error('Sorry your payment was not successful Please try again');
					this.setState({ loading: false });
				})
		}
		catch{
			message.error('Sorry your payment was not successful Please try again');
			this.setState({ loading: false });
		}

	};
	render() {
		return (
			<div className="campaign-wrapper">
				{this.state.success ? (<Result
					status="success"
					title={`We have received your payment with Token key`}
					visible={this.state.success}
					// subTitle={"Use this token key to track your donation, Thank you "}
					extra={<Button type="primary" onClick={this.toggleSuccess}>Go Back</Button>}
				>
					<Paragraph copyable>{this.state.donationkey}</Paragraph>
				</Result>) :
					(
						<Row className="campaign" justify="space-around">
							<Col className="campaign-desc-wrapper" md={8} sm={18} xs={22}>
								<p className="campaign-desc-title">Description</p>
								<p className="campaign-desc">{this.state.desc}</p>
								<p className="campaign-desc-title">Root Owner</p>
								<p className="campaign-desc">{this.state.owner}</p>
							</Col>
							<Col className="donate-form" md={6} sm={18} xs={22}>

								<div className="donation-title">Payment</div>
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
									placeholder="Enter Amount in Matic Tokens (Wei)"
									onChange={(e) => this.handleChangeNumber(e)}
									value={this.state.value}
								/>
								<br />
								<br />

								{
									(!this.state.loading) ? (
										< Button
											type="primary"
											onClick={this.handleSubmit}
											block
										>
											Proceed
										</Button>)
										: (
											<Spin spinning={this.state.loading} className="donation-spin" />
										)}
							</Col>
						</Row>

					)


				}

			</div>
		);
	}
}

export default Campaign;
