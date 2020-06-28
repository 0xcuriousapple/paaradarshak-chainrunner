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
import Paaradarshak from "../contracts/paardarshak.json";

import { GithubOutlined } from '@ant-design/icons';
import './home.scss';
const { Header, Content, Footer } = Layout;

const AppMenuMapper = [
    { key: '0', value: 'Home', icon: <HomeOutlined /> },
    { key: '2', value: 'Pay', icon: <SoundOutlined /> },
    { key: '3', value: 'Audit', icon: <ForkOutlined /> },
    { key: '4', value: 'Track', icon: <FileSearchOutlined /> },
    { key: '1', value: 'Authority', icon: <UserOutlined /> }
]

const LandingMenuMapper = [
    { key: '7', value: 'Docs', link: 'https://github.com/abhishekvispute/paaradarshak-chainrunner' },
    { key: '8', value: 'View on Github', link: 'https://github.com/abhishekvispute/paaradarshak-chainrunner' },
]
let labels = [

]

let mapAuthAddresstoName = {}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { midAuthName: 'MidAuthName', accounts: [], campaignName: '', isNoAuth: false, isRootAuth: false, isMidAuth: false, drawerVisible: false, selectedMenuItem: '0', selectedPage: <Landing />, contract: "" };
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.changedProp !== this.props.changedProp) {
    //         this.setState({
    //             changedProp: this.props.changedProp
    //         });
    //     }
    // }
    componentDidMount() {
        this.setState({ accounts: this.props.web3.accounts });
        window.ethereum.on('accountsChanged', (acc) => {
            this.setState({ accounts: acc })
            this.setState({ isRootAuth: false });
            this.setState({ isMidAuth: false });
            this.setState({ isNoAuth: false });
            if (this.props.web3.contract != null) {
                this.call();
            }
        })
    }
    call() {
        labels = [

        ]

        mapAuthAddresstoName = {}
        const { contract } = this.props.web3;
        console.log(contract);


        contract.methods.getAllListedAuthAddress().call({ from: this.state.accounts[0], gas: 3000000 })
            .then((result) => {

                let i;
                console.log(result);
                let promises = [];
                for (i = 0; i < result.length; i++) {
                    let temp = result[i];

                    let add = this.state.accounts[0]
                    promises.push(new Promise(function (resolve, reject) {
                        console.log(temp);
                        contract.methods.getSingleAuthDetails(temp).call({ from: add, gas: 3000000 })
                            .then((r) => {
                                console.log(r);
                                labels.push({ 'value': r['name'] })
                                mapAuthAddresstoName[temp.toLowerCase()] = r['name'];
                            }).then(() => {
                                resolve();
                            })

                    }))
                }
                Promise.all(promises).then(() => {
                    console.log(this.state.accounts[0].toLowerCase());
                    console.log(mapAuthAddresstoName);
                    if (mapAuthAddresstoName[this.state.accounts[0].toLowerCase()] == 'Root') {
                        this.setState({ isRootAuth: true });

                    }
                    else if (mapAuthAddresstoName.hasOwnProperty(this.state.accounts[0].toLowerCase())) {
                        console.log('midauth');
                        this.setState({ isMidAuth: true });
                        this.setState({ midAuthName: mapAuthAddresstoName[this.state.accounts[0].toLowerCase()] })
                    }
                    else {
                        this.setState({ isNoAuth: true });
                    }
                });

            });
    };

    handleToggleDrawer = (bool) => {
        this.setState({ drawerVisible: bool });
    }
    handleChangeMenu = (key) => {
        this.handleToggleDrawer(false);
        this.setState({ selectedMenuItem: key });
        if(key=='0') this.setState({campaignName: ''});
    }
    liveCampClicked = (name, owner) => {
        this.setState({ selectedMenuItem: '2', campaignName: name, drawerVisible: false });
        console.log(this.props.web3);
        const w = this.props.web3.web3;
        const instance = new w.eth.Contract(Paaradarshak.abi, owner);
        this.props.web3.contract = instance;
        this.setState({ contract: instance });
        this.setState({ isRootAuth: false });
        this.setState({ isMidAuth: false });
        this.setState({ isNoAuth: false });
        this.call();
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
                {this.state.selectedMenuItem == '0' ? <Landing liveCampClicked={this.liveCampClicked} web3={this.props.web3} /> :
                    this.state.selectedMenuItem == '1' && this.state.isRootAuth ? <RootAuth handleChangeMenu={this.handleChangeMenu} web3={this.props.web3} acc={this.state.accounts} /> :
                        this.state.selectedMenuItem == '1' && this.state.isMidAuth ? <MidAuth midAuthName={this.state.midAuthName} web3={this.props.web3} acc={this.state.accounts} /> :
                            this.state.selectedMenuItem == '3' ? <Tree web3={this.props.web3} /> :
                                this.state.selectedMenuItem == '2' ? <Campaign web3={this.props.web3} /> :
                                    this.state.selectedMenuItem == '4' ? <Track web3={this.props.web3} /> :
                                        this.state.selectedMenuItem == '5' ? <RootAuth web3={this.props.web3} labels={this.state.labels} /> :
                                            this.state.selectedMenuItem == '6' ? <MidAuth web3={this.props.web3} labels={this.state.labels} /> :
                                                <div></div>}
            </Layout>
        );
    }
}

export default Home;