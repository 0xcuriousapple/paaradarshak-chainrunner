import React from 'react';
import { Row, Col } from 'antd';
import ProblemImg from './undraw_gifts_btw0.svg';

class Problem extends React.Component {
	render() {
		return (
			/* Problem we solve SECTION */
			<div>
				<Row>
					<div className="problem-title">Problem We Solve</div>
				</Row>

				<Row className="hero">
					<Col style={{ textAlign: 'center' }} sm={24} md={12}>
						{' '}
						<img className="hero-img" src={ProblemImg} />
					</Col>
					<Col sm={24} md={12} className="">
						<div className="problem-content">
							<p>
								Several donation campaigns are initiated to
								raise funds for those in need. <br /> The donor
								is not aware of the way these funds are being
								utilized.
							</p>
							<p>
								With Pardarshak the donor can not only visualize
								how the total funds raised <br /> are being
								utilized but will also be able to know how his
								individual contribution is being used
							</p>
							<p>
								Pardarshak redefines trust by enabling highly
								visible and traceable transactions, <br />{' '}
								allowing donors to track all their transactions
								from the beginning to the end <br /> and verify
								where their funds were used.
							</p>
							<p>
								It also prevents fraudulent intermediaries from
								pocketing part of the money that <br /> was
								meant for the recipient. The system is
								decentralized and can be managed <br /> by the
								people eliminating the need of a central
								authority for collecting the donations.
							</p>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Problem;
