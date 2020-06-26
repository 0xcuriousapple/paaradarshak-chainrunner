import React from 'react';
import { Drawer, Menu, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserOutlined, ForkOutlined, FileSearchOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
import Authority from './authority';
import Register from './register';
import Landing from './landing';
import Tree from './tree';
import Track from './track';
import Donate from './donate';
import RootAuth from './rootAuth';
import MidAuth from './midAuth';
import './home.scss';
const { Header, Content, Footer } = Layout;

const MenuMapper = [
    { key: '0', value: 'Home', icon: <HomeOutlined />, component: <Landing /> },
    // { key: '1', value: 'Authority', icon: <UserOutlined />, component: <Authority /> },
    { key: '2', value: 'Donate', icon: <DollarOutlined />, component: <Donate /> },
    { key: '3', value: 'Explore', icon: <ForkOutlined /> },
    { key: '4', value: 'Track', icon: <FileSearchOutlined /> },
    { key: '1', value: 'Authority', icon: <UserOutlined />, component: <Authority /> },
    // { key: '5', value: 'Register', icon: <FileSearchOutlined />, component: <Register /> },
    // { key: '4', value: 'Track your Donation', icon: <FileSearchOutlined /> },
    { key: '5', value: 'Root Authority' },
    { key: '6', value: 'Middle Authority' },
]

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawerVisible: false, selectedMenuItem: '0', selectedPage: <Landing /> };
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

    render() {
        return (
            <Layout className="home">
                <Header className="header">
                    <MenuOutlined className="menu-unfold" type="default" onClick={() => this.handleToggleDrawer(true)} />
                    <div>Paaradarshak</div>
                    <Menu className="desktop-menu" theme="dark" mode="horizontal" selectedKeys={[this.state.selectedMenuItem]}>
                        {MenuMapper.map((obj) => {
                            if (parseInt(obj.key) < 5)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key}>{obj.value}</Menu.Item>
                        })}
                    </Menu>
                </Header>
                <Drawer
                    title="Welcome, User"
                    placement="left"
                    closable={true}
                    onClose={() => this.handleToggleDrawer(false)}
                    visible={this.state.drawerVisible}>
                    <Menu
                        style={{ width: 256 }}
                        selectedKeys={[this.state.selectedMenuItem]}
                        mode="inline"
                        theme="light">
                        {MenuMapper.map((obj) => {
                            if (parseInt(obj.key) < 5)
                                return <Menu.Item onClick={() => this.handleChangeMenu(obj.key)} key={obj.key} icon={obj.icon}>
                                    {obj.value}
                                </Menu.Item>
                        })}
                    </Menu>
                </Drawer>
                {this.state.selectedMenuItem == '0' ? <Landing /> :
                    this.state.selectedMenuItem == '1' ? <Authority handleChangeMenu={this.handleChangeMenu} web3={this.props.web3} /> :
                        this.state.selectedMenuItem == '3' ? <Tree web3={this.props.web3} /> :
                            this.state.selectedMenuItem == '2' ? <Donate web3={this.props.web3} /> :
                                this.state.selectedMenuItem == '4' ? <Track web3={this.props.web3} /> :
                                    this.state.selectedMenuItem == '5' ? <RootAuth web3={this.props.web3} labels={this.state.labels} /> :
                                        this.state.selectedMenuItem == '6' ? <MidAuth web3={this.props.web3} labels={this.state.labels} /> :
                                            <Register />}
            </Layout>
        );
    }
}

export default Home;