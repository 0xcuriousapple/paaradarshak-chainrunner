import React from 'react';
import { Drawer, Menu, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserOutlined, SoundOutlined, ForkOutlined, FileSearchOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
import Authority from './authority';
import Register from './register';
import Landing from './landing';
import Tree from './tree';
import Track from './track';
import Campaign from './campaign';
import RootAuth from './rootAuth';
import MidAuth from './midAuth';
import { GithubOutlined } from '@ant-design/icons';
import './home.scss';
const { Header, Content, Footer } = Layout;

const AppMenuMapper = [
    { key: '0', value: 'Home', icon: <HomeOutlined /> },
    { key: '2', value: 'Donate', icon: <SoundOutlined /> },
    { key: '3', value: 'Explore', icon: <ForkOutlined /> },
    { key: '4', value: 'Track', icon: <FileSearchOutlined /> },
    { key: '1', value: 'Authority', icon: <UserOutlined /> }
]

const LandingMenuMapper = [
    { key: '7', value: 'Docs', link: 'https://github.com' },
    { key: '8', value: 'View on Github', link: 'https://github.com' },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { midAuthName: 'MidAuthName', campaignName: '', isNoAuth: false, isRootAuth: false, isMidAuth: true, drawerVisible: false, selectedMenuItem: '0', selectedPage: <Landing /> };
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.changedProp !== this.props.changedProp) {
    //         this.setState({
    //             changedProp: this.props.changedProp
    //         });
    //     }
    // }
    handleToggleDrawer = (bool) => {
        this.setState({ drawerVisible: bool });
    }
    handleChangeMenu = (key) => {
        this.handleToggleDrawer(false);
        this.setState({ selectedMenuItem: key });
    }
    liveCampClicked = (name, owner) => {
        this.setState({ selectedMenuItem: '2', campaignName: name, drawerVisible: false });
    }
    render() {
        return (
            <Layout className="home">
                <Header className="header">
                    <MenuOutlined className="menu-unfold" type="default" onClick={() => this.handleToggleDrawer(true)} />
                    <div>{this.state.campaignName != '' ? this.state.campaignName : 'Paaradarshak'}</div>
                    <Menu className="desktop-menu" theme="dark" mode="horizontal" selectedKeys={[this.state.selectedMenuItem]}>
                        {this.state.selectedMenuItem !== '0' ? AppMenuMapper.map((obj) => {
                            if (parseInt(obj.key) < 5 && parseInt(obj.key) != 1)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>
                            else if (parseInt(obj.key) == 1 && !this.state.isNoAuth)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>

                        }) :
                            LandingMenuMapper.map((obj) => {
                                return <Menu.Item key={obj.key}><a target='_blank' href={obj.link}>{obj.value}</a></Menu.Item>
                            })}
                    </Menu>
                </Header>
                <Drawer title="Welcome, User"
                    placement="left"
                    closable={true}
                    onClose={() => this.handleToggleDrawer(false)}
                    visible={this.state.drawerVisible}>
                    <Menu
                        style={{ width: 256 }}
                        selectedKeys={[this.state.selectedMenuItem]}
                        mode="inline"
                        theme="light">
                        {this.state.selectedMenuItem !== '0' ? AppMenuMapper.map((obj) => {
                            if (parseInt(obj.key) < 5)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key} icon={obj.icon}>
                                    {obj.value}
                                </Menu.Item>
                            else if (parseInt(obj.key) == 1 && !this.state.isNoAuth)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>

                        }) : LandingMenuMapper.map((obj) => {
                            return <Menu.Item key={obj.key}><a target='_blank' href={obj.link}>{obj.value}</a></Menu.Item>
                        })}
                    </Menu>
                </Drawer>
                {this.state.selectedMenuItem == '0' ? <Landing liveCampClicked={this.liveCampClicked} /> :
                    this.state.selectedMenuItem == '1' && this.state.isRootAuth ? <RootAuth handleChangeMenu={this.handleChangeMenu} web3={this.props.web3} /> :
                        this.state.selectedMenuItem == '1' && this.state.isMidAuth ? <MidAuth midAuthName={this.state.midAuthName} web3={this.props.web3} /> :
                            this.state.selectedMenuItem == '3' ? <Tree web3={this.props.web3} /> :
                                this.state.selectedMenuItem == '2' ? <Campaign web3={this.props.web3} /> :
                                    this.state.selectedMenuItem == '4' ? <Track web3={this.props.web3} /> :
                                        this.state.selectedMenuItem == '5' ? <RootAuth web3={this.props.web3} labels={this.state.labels} /> :
                                            this.state.selectedMenuItem == '6' ? <MidAuth web3={this.props.web3} labels={this.state.labels} /> :
                                                <Register />}
            </Layout>
        );
    }
}

export default Home;