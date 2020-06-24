import React from 'react';
import { Row, Col, Card } from 'antd';

const gridStyle = {
	margin:'10px',
	padding:'40px',
	width:'50%',
};
class Features extends React.Component {
	render() {
		return (
			/* FEATURES SECTION */
			<div>
				<Row>
					<div className="problem-title">Features</div>
				</Row>
				<Row>
					<Col md={12} sm={6}>
						<Card.Grid style={gridStyle}>Transparent</Card.Grid>
						<Card.Grid style={gridStyle}>Secure</Card.Grid>
						<Card.Grid style={gridStyle}>Immutable</Card.Grid>
						<Card.Grid style={gridStyle}>Decentralized</Card.Grid>
						<Card.Grid style={gridStyle}>Traceable</Card.Grid>
						<Card.Grid style={gridStyle}>Scalable(Matic)</Card.Grid>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Features;
