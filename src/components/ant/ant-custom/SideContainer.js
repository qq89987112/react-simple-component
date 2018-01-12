import React from 'react';
import {Layout, Menu, Button, Dropdown} from 'antd'
import './css/SideContainer.scss'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseComponent from "../../BaseComponent";

const {Header, Content, Sider} = Layout,
    MenuItem = Menu.Item;


class SideContainer extends BaseComponent {
    state = {
        activeIndex: 0,
        language:localStorage.getItem('language')||"zh-cn"
    }

    static contextTypes ={
        router:PropTypes.object.isRequired,
        setLanguage:PropTypes.func.isRequired,
    }

    render() {
        let
            {side, content} = this.props,
            language = this.state.language;

            content = content.map(item => () => item);


        return (
            <Layout className='side-container'>
                <Sider collapsible>
                    <div className="logo"/>
                    <Menu theme='dark' className='side-menu' mode="inline">
                        {side.map((item, index) => <MenuItem key={index}>{item}</MenuItem>)}
                    </Menu>
                </Sider>
                <Layout>
                        {/*<Header className='side-content-header'>*/}
                            {/*<Button onClick={()=>{*/}
                                {/*this.context.setLanguage(language = language==='zh-cn'?'en':'zh-cn');*/}
                                {/*this.setState({*/}
                                    {/*language*/}
                                {/*})*/}
                            {/*}}>{language==='zh-cn' ? 'English' : "简体中文"}</Button>*/}
                            {/*<Dropdown overlay={<Menu>*/}
                                {/*<MenuItem><Link to="/login/reset">{this.$f("password.edit")}</Link></MenuItem>*/}
                                {/*<MenuItem><a onClick={(e)=>{*/}
                                    {/*e.preventDefault();*/}
                                    {/*localStorage.setItem(consts.AUTH,"");*/}
                                    {/*this.context.router.history.push("/login")*/}
                                {/*}}>{this.$f("logout")}</a></MenuItem>*/}
                            {/*</Menu>}><Button>Clouds</Button></Dropdown>*/}
                        {/*</Header>*/}
                    <div className='side-content-wrapper'>
                        <Content className="side-content">
                            {
                                content.map((Item, index) => <Item key={index}/>)
                            }
                        </Content>
                    </div>
                </Layout>
            </Layout>
        )
    }
}

export default SideContainer