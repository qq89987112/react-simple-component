import React from 'react';
import {Layout, Menu, Button, Dropdown,Tabs} from 'antd'
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



    add = (title,component) => {
        const
            panes = this.state.panes || [],
            added = this.added = this.added || {};
            if(added[title]){
                return;
            }
            added[title] = component;
            panes.push({ title,component});
            this.setState({ panes, activeKey:""+(panes.length-1)});
    }

    remove = (targetKey) => {
        const
            panes = this.state.panes || [],
            added = this.added = this.added || {},
            deleted = panes.splice(targetKey,1);

        let
            activeKey = +this.state.activeKey;
            targetKey = +targetKey;
            if(activeKey === targetKey || targetKey < activeKey){
                activeKey -= 1;
            }
            this.setState({ panes, activeKey:""+activeKey });
            added[deleted[0].title] = undefined;
    }
    render() {
        let
            {side, content = [],type} = this.props,
            language = this.state.language;
            content = content.map(item => () =>item);


        return (
            <Layout className={['side-container',type]}>
                <Sider collapsible>
                    <div className="logo"/>
                    <Menu theme='dark' className='side-menu' mode="inline" onClick={({key})=>{
                        const item = side[+key];
                        this.add(item.title,item.component)
                    }}>
                        {
                            type==='router'&&side.map((item, index) => <MenuItem key={index}>{item}</MenuItem>) ||
                            type===undefined &&  side.map((item, index) => <MenuItem key={index} ><span>{item.title}</span></MenuItem>)
                        }
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
                                type==='router'&& content.map((Item, index) => <Item key={index}/>) ||
                                type===undefined && <Tabs
                                    hideAdd
                                    onChange = {(activeKey) => this.setState({ activeKey })}
                                    activeKey={this.state.activeKey}
                                    type="editable-card"
                                    onEdit={(targetKey, action) =>this[action](targetKey)}
                                >
                                    {(this.state.panes||[]).map((pane,index) => <Tabs.TabPane tab={pane.title} key={index}>{<pane.component/>}</Tabs.TabPane>)}
                                </Tabs>
                            }
                        </Content>
                    </div>
                </Layout>
            </Layout>
        )
    }
}

export default SideContainer