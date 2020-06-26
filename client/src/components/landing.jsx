import React from 'react';
import { Row, Col, Button, Modal, Card, Input } from 'antd';
import HeroImg from './hero.svg';
import Logo from './logo.png';
import Workflow from './workflow';
import Features from './features';
import Teams from '../containers/teams/teams';
import Footer from '../containers/footer/footer';

const liveCamp = [
	{ name: 'Live Camp 1', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 2', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 3', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 4', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 5', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 6', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 7', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 8', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 9', owner: 'sfwec236n923bc' },
	{ name: 'Live Camp 0', owner: 'sfwec236n923bc' },
]

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = { liveCampVisible: false, createCampVisible: false, liveCamp: liveCamp, name: '', desc: '' };
	}
	toggleModal = (type, bool) => {
		this.setState({ [type]: bool });
	}
	liveCampClicked = (name, owner) => {
		console.log(name, owner);
	}
	handleChange = e => {
		var name = e.target.name;
		this.setState({[name]: e.target.value});
	}
	createCampClicked = () => {
		console.log(this.state.name, this.state.desc);
		this.setState({createCampVisible: false, name: '', desc: ''});
	}
	render() {
		return (
			/* Landing Hero Section */
			<div className="landing">
				<Row className="hero">
					<Col sm={24} md={12} className="hero-txt">
						<img src={Logo} style={{height: '100px', width: 'auto'}}/>
						<div className="hero-title">Paaradarshak</div>
						<div className="hero-details">
							A Blockchain based Donation system for <br />
							enhanced transparency
						</div><br />
						<Button onClick={() => this.toggleModal('liveCampVisible', true)} size="large" type="default">Live Campaigns</Button>&nbsp;&nbsp;&nbsp;&nbsp;
						<Button onClick={() => this.toggleModal('createCampVisible', true)} size="large" type="primary">Create Campaign</Button>
						<Modal
							visible={this.state.liveCampVisible}
							title="Live Campaigns"
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
										<p>{obj.name}</p>
										{obj.owner}
									</Card>
								})}
							</div>
						</Modal>
						<Modal
							title="Create New Campaogn"
							visible={this.state.createCampVisible}
							onOk={this.createCampClicked}
							onCancel={() => this.toggleModal('createCampVisible', false)}
						>
							<Input placeholder="Name" name='name' value={this.state.name} onChange={this.handleChange} /><br/><br/>
							<Input.TextArea placeholder="Description" name='desc' value={this.state.desc} onChange={this.handleChange}  />	
						</Modal>
					</Col>
					<Col style={{ textAlign: 'center' }} sm={24} md={12}>
						{' '}
						<img className="hero-img" src={HeroImg} />
					</Col>
				</Row>

				<Features/>
				<Workflow />
				{/*<Teams/>
				<Footer/> */}
			</div>
		);
	}
}

export default Landing;