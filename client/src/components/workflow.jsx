import React from 'react';
import { Row, Col } from 'antd';
import workflow1 from './workflowImg/workflow.jpg';
class Workflow extends React.Component {
    render() {
        return (
            <div className='workflow'>
                <div className='workflow-title'>Resilent Workflow</div>
                <div className='workflow-subtitle'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.</div>
                {window.innerWidth > 768 ? <div>
                    <Row className='workflow-row' justify="space-around" align="middle" >
                        <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                            <div className='workflow-txt-title'>Data-driven insights</div>
                            <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        </Col>
                        <Col md={10} sm={18} xs={22}>
                            <img src={workflow1} width="100%" />
                        </Col>
                    </Row>
                    <Row className='workflow-row' justify="space-around" align="middle" >
                        <Col md={10} sm={18} xs={22}>
                            <img src={workflow1} width="100%" />
                        </Col>
                        <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                            <div className='workflow-txt-title'>Data-driven insights</div>
                            <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        </Col>
                    </Row>
                    <Row className='workflow-row' justify="space-around" align="middle" >
                        <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                            <div className='workflow-txt-title'>Data-driven insights</div>
                            <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        </Col>
                        <Col md={10} sm={18} xs={22}>
                            <img src={workflow1} width="100%" />
                        </Col>
                    </Row>
                    <Row className='workflow-row' justify="space-around" align="middle" >
                        <Col md={10} sm={18} xs={22}>
                            <img src={workflow1} width="100%" />
                        </Col>
                        <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                            <div className='workflow-txt-title'>Data-driven insights</div>
                            <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        </Col>
                    </Row>
                </div> :
                    <div>
                        <Row className='workflow-row' justify="space-around" align="middle" >
                            <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                                <div className='workflow-txt-title'>Data-driven insights</div>
                                <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                            </Col>
                            <Col md={10} sm={18} xs={22}>
                                <img src={workflow1} width="100%" />
                            </Col>
                        </Row>
                        <Row className='workflow-row' justify="space-around" align="middle" >
                            <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                                <div className='workflow-txt-title'>Data-driven insights</div>
                                <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                            </Col>
                            <Col md={10} sm={18} xs={22}>
                                <img src={workflow1} width="100%" />
                            </Col>
                        </Row>
                        <Row className='workflow-row' justify="space-around" align="middle" >
                            <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                                <div className='workflow-txt-title'>Data-driven insights</div>
                                <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                            </Col>
                            <Col md={10} sm={18} xs={22}>
                                <img src={workflow1} width="100%" />
                            </Col>
                        </Row>
                        <Row className='workflow-row' justify="space-around" align="middle" >
                            <Col className='workflow-txt-wrapper' md={8} sm={18} xs={22}>
                                <div className='workflow-txt-title'>Data-driven insights</div>
                                <div className='workflow-txt-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                            </Col>
                            <Col md={10} sm={18} xs={22}>
                                <img src={workflow1} width="100%" />
                            </Col>
                        </Row>
                    </div>}
            </div>
        )
    }
}

export default Workflow;