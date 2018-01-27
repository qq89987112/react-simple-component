import React from 'react';
import {Layout, Menu, Button, Dropdown,Tabs} from 'antd'
import './css/SideContainer.scss'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseComponent from "../BaseComponent";

const {Header, Content, Sider} = Layout,
    MenuItem = Menu.Item,
    SubMenu  = Menu.SubMenu ;


class SideContainer extends BaseComponent {
    state = {
        activeIndex: 0,
        language:localStorage.getItem('language')||"zh-cn"
    }

    static contextTypes ={
        router:PropTypes.object.isRequired,
        setLanguage:PropTypes.func.isRequired,
    }

    _add = (title,component,key)=>{
        console.log(key);
        const
            panes = this.state.panes || []
            panes.push({ title,component,key});
            this.setState({ panes, activeKey:key});
    }

    _change = (activeKey)=>{
        this.setState({ activeKey });
    }

    _remove = (targetKey)=>{
        let
            activeKey = this.state.activeKey,
            panes = this.state.panes,
            lastIndex = panes.findIndex(pane=>pane.key === targetKey) -1;

        panes = panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    add = (title,component) => {
        const
            panes = this.state.panes || [],
            // 不能使用外部变量储存，必须即时计算。
            // added = this.added = this.added || {},
            pane = panes.find(pane=>pane.title===title);
            if(pane){
                return this.change(pane.key);
            }
            this._add(title,component,""+((+(panes[panes.length-1]||{}).key||0)+1))
    }

    change = (activeKey)=>{
        this._change(activeKey);
    }




    // 应该是一个通过key remove的方法，key默认为index应该是该方法的语法糖。
    remove =  (targetKey) => {
         this._remove(targetKey);
    }

    render() {
        let
            {side, content = [],type} = this.props,
            language = this.state.language;
            content = content.map(item => () =>item);

            const renderMenuChildren = (children)=>{
                return children.map((child, index) => child.children ? <SubMenu title={child.title}>
                    {renderMenuChildren(child.children)}
                </SubMenu> : <MenuItem item={child}><span>{child.title}</span></MenuItem>)
            }
        return (
            <Layout className={['side-container',type]}>
                <Sider collapsible>
                    <div className="logo"/>
                    <Menu theme='dark' className='side-menu' mode="inline" onClick={({item})=>{
                        item = item.props.item;
                        this.add(item.title,item.component)
                    }}>
                        {
                            type==='router'&&side.map((item, index) => <MenuItem key={index}>{item}</MenuItem>) ||
                            type===undefined &&  renderMenuChildren(side)
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
                                    {(this.state.panes||[]).map((pane,index) => <Tabs.TabPane className='tab-panel' tab={pane.title} key={pane.key}>{<pane.component/>}</Tabs.TabPane>)}
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