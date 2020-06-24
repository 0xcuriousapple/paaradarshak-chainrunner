import React from 'react';
import { Card, Row, Col } from 'antd';

class Teams extends React.Component {
	render() {
		return (
			/* TEAMS SECTION */
			<div>
				<Row>
					<div className="problem-title">Our Unique Team</div>
				</Row>
				<div className="site-card-wrapper">
					<Row gutter={16} style={{ margin:'0 auto', textAlign:'center' }}>
						<Col span={4}>
							<Card title="Jatin Varlyani" bordered={false}>
								Developer
							</Card>
						</Col>
						<Col span={4}>
							<Card title="Abhishek Vispute" bordered={false}>
								Developer
							</Card>
						</Col>
						<Col span={4}>
							<Card title="Viraj Gawde" bordered={false}>
								Developer
							</Card>
						</Col>
						<Col span={4}>
							<Card title="Anuj Arora" bordered={false}>
								Documentation
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
export default Teams;