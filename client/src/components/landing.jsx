import React from 'react';
import { Row, Col, Button, Modal, Card, Input } from 'antd';
import HeroImg from './hero.svg';
import Logo from './logo.png';
import Workflow from './workflow';
import Features from './features';
import Teams from '../containers/teams/teams';
import Footer from '../containers/footer/footer';
import { message } from 'antd';
import { Typography, Space } from 'antd';
import { Graph } from "react-d3-graph";
import './waterflow.css';


const { Text, Link } = Typography;

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
const data = {
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
		{
			id: "Ministry of Health and Family Welfare"
		},
		{
			id: "Ministry of Agriculture"
		},
		{
			id: "MLA..."
		}, {
			id: "Ministry..."
		}
	],
	links: [
		{
			source: "Root",
			target: "Ministry of Health and Family Welfare",
			label: 30,
		},
		{
			source: "Root",
			target: "Ministry of Agriculture",
			label: 20,
		},
		{
			source: "Ministry of Health and Family Welfare",
			target: "Ministry...",
			label: 5,
		},
		{
			source: "Ministry of Agriculture",
			target: "MLA...",
			label: 7,
		}
	],
}
class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = { liveCampVisible: false, createCampVisible: false, liveCamp: [], name: '', desc: '', funds: [], mapNametoAddress: {} };
	}
	getDetails(add, parentContract, accounts) {

		parentContract.methods.getDetailsOfFund(add).call({ from: accounts[0], gas: 3000000 })
			.then((fundinfo) => {
				// let t = this.state.mapNametoAddress;
				// t[fundinfo.name] = add;
				// this.setState({ mapNametoAddress: t });
				if (fundinfo.name != 'Federal Taxes' && fundinfo.name != 'Federal Tax' && fundinfo.name != 'pmcares') {
					let t = this.state.liveCamp;
					t.push({ 'name': fundinfo.name, 'owner': add });
					this.setState({ liveCamp: t });
				}
			})
	}
	componentDidMount = async () => {

		const { parentContract, accounts } = this.props.web3;

		parentContract.methods.getAllDeployedFunds().call({ from: accounts[0], gas: 3000000 })
			.then((result) => {
				let i;
				for (i = 0; i < result.length; i++) {
					this.getDetails(result[i], parentContract, accounts);
				}
			})

	};
	toggleModal = (type, bool) => {
		this.setState({ [type]: bool });
	}
	liveCampClicked = (name, owner) => {
		console.log(name, owner);
		this.props.liveCampClicked(name, owner);

	}
	handleChange = e => {
		var name = e.target.name;
		this.setState({ [name]: e.target.value });
	}
	createCampClicked = () => {
		console.log(this.state.name, this.state.desc);
		const { parentContract, accounts } = this.props.web3;
		parentContract.methods.createFunds(this.state.name, this.state.desc).send({ from: accounts[0], gas: 3000000 })
			.then(() => {

				message.success('New Fund Created Succesfully');
				let contractadd;
				parentContract.methods.getAllDeployedFunds().call({ from: accounts[0], gas: 3000000 }).
					then((result) => {

						contractadd = result[result.length - 1];
						let t = this.state.liveCamp
						t.push({ name: this.state.name, owner: contractadd });
						this.setState({ liveCamp: t });
						this.setState({ createCampVisible: false, name: '', desc: '' });
					})
			})

			.catch(() => {
				message.error('Sorry your TX was not successful Please try again');
			})


	}
	render() {
		return (
			/* Landing Hero Section */
			<div className="landing">
				<Row className="hero">
					<Col sm={24} md={12} className="hero-txt">
						<img src={Logo} style={{ height: '100px', width: 'auto' }} />
						<div className="hero-title">Paaradarshak</div>
						<div className="hero-details">
							A Blockchain based Fund Manager<br />
							<div className="tagline">
								Transparent as Water
							</div>
						</div><br />
						<Button onClick={() => this.toggleModal('liveCampVisible', true)} size="large" type="default">Live Funds</Button>&nbsp;&nbsp;&nbsp;&nbsp;
						<Button onClick={() => this.toggleModal('createCampVisible', true)} size="large" type="primary">Create New Fund</Button>
						<Modal
							visible={this.state.liveCampVisible}
							title="Live Funds"
							onOk={() => this.toggleModal('liveCampVisible', false)}
							onCancel={() => this.toggleModal('liveCampVisible', false)}
							footer={[
								<Button key="back" type="primary" onClick={() => this.toggleModal('liveCampVisible', false)}>
									Return
            					</Button>
							]}
						>
							<div style={{ overflowY: 'auto', height: '350px' }}>
								{this.state.liveCamp.map((obj, key) => {
									return <Card key={key} onClick={() => this.liveCampClicked(obj.name, obj.owner)} style={{ marginBottom: '10px', cursor: 'pointer' }}>


										<Text strong>{obj.name}</Text><br />
										<Text>Contract Address : {obj.owner}</Text>

									</Card>
								})}
							</div>
						</Modal>
						<Modal
							title="Create New Fund"
							visible={this.state.createCampVisible}
							onOk={this.createCampClicked}
							onCancel={() => this.toggleModal('createCampVisible', false)}
						>
							<Input placeholder="Name" name='name' value={this.state.name} onChange={this.handleChange} /><br /><br />
							<Input.TextArea placeholder="Description" name='desc' value={this.state.desc} onChange={this.handleChange} />
						</Modal>
					</Col>
					<Col style={{ textAlign: 'center' }} sm={24} md={12}>
						{' '}
						<img className="hero-img" src={HeroImg} />
						{/* <Graph
							id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
							data={data}
							config={myConfig}
						// onClickNode={this.onClickNode}
						// onClickLink={this.onClickLink}
						/> */}
						{/* <img className="hero-img" src={HeroImg} /> */}
					</Col>
				</Row>

				{/* <Features /> */}
				{/* <footer>
					<svg viewBox="0 0 120 10">
						<defs>
							<path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
						</defs>
						<use id="wave3" className="wave" xlinkHref="#wave" x={0} y={-1} />
						<use id="wave2" className="wave" xlinkHref="#wave" x={0} y={0} />
					</svg>
				</footer>; */}
				{/* <Workflow /> */}
				{/*<Teams/>
				<Footer/> */}
			</div>
		);
	}
}

export default Landing;