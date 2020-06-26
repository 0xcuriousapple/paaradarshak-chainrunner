import React from 'react';
import { Row, Col, Card } from 'antd';
import TransparentIcon from './featureIcon/transparent.png';
import TraceableIcon from './featureIcon/trace.png';
import ScalableIcon from './featureIcon/scale.png';
import SecureIcon from './featureIcon/secure.png';
import ImmutableIcon from './featureIcon/immutable.png';
import DecentralisedIcon from './featureIcon/decentralised.png';
class Features extends React.Component {
	render() {
		return (
			/* FEATURES SECTION */
			<div className="features">
				<div className="features-title">Build up the whole picture</div>
				<div className="features-subtitle">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
				<Row className='feature-row' justify="space-around" align="middle">
					<Col className='feature-card' md={6} sm={20}>
						<img src={TransparentIcon} />
						<div className='feature-title'>Transparent</div>
						<div className='feature-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
					</Col>
					<Col className='feature-card' md={6} sm={20}>
						<img src={ScalableIcon} />
						<div className='feature-title'>Scalable</div>
						<div className='feature-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
					</Col>
					<Col className='feature-card' md={6} sm={20}>
						<img src={SecureIcon} />
						<div className='feature-title'>Secure</div>
						<div className='feature-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
					</Col>
				</Row>
				<Row className='feature-row' justify="space-around" align="middle">
					<Col className='feature-card' md={6} sm={20}>
						<img src={DecentralisedIcon} />
						<div className='feature-title'>Decentralised</div>
						<div className='feature-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
					</Col>
					<Col className='feature-card' md={6} sm={20}>
						<img src={ImmutableIcon} />
						<div className='feature-title'>Immutable</div>
						<div className='feature-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
					</Col>
					<Col className='feature-card' md={6} sm={20}>
						<img src={TraceableIcon} />
						<div className='feature-title'>Traceable</div>
						<div className='feature-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Features;
