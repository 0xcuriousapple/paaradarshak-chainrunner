import React from 'react';
import { Row, Col, Button } from 'antd';
import HeroImg from './hero.svg';
import Problem from '../containers/problem/probelm';
import Features from '../containers/features/features';
import Teams from '../containers/teams/teams';
import Footer from '../containers/footer/footer';
class Landing extends React.Component {
	render() {
		return (
			/* Landing Hero Section */
			<div className="landing">
				<Row className="hero">
					<Col sm={24} md={12} className="hero-txt">
						<div className="hero-title">Paaradarshak</div>
						<div className="hero-details">
							A Blockchain based Donation system for <br />
							enhanced transparency
						</div><br/>
						<Button size="large" type="default">Live Campaigns</Button>&nbsp;&nbsp;&nbsp;&nbsp;
						<Button size="large" type="primary">Create Campaign</Button>
					</Col>
					<Col style={{ textAlign: 'center' }} sm={24} md={12}>
						{' '}
						<img className="hero-img" src={HeroImg} />
					</Col>
				</Row>

				{/* <Problem />
				<Features/>
				<Teams/>
				<Footer/> */}
			</div>
		);
	}
}

export default Landing;