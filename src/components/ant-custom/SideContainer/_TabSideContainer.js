import React from 'react';
import createReactClass from 'create-react-class';
import {Layout, Menu, Button, Dropdown,Tabs} from 'antd'
import './css/SideContainer.scss'
import {Link,Route} from 'react-router-dom'
import BaseComponent from "../BaseComponent";
import PropTypes from 'prop-types'

const {Header, Content, Sider} = Layout,
    MenuItem = Menu.Item,
    SubMenu  = Menu.SubMenu ;

// 注意父路由不能写 exact
export default class TabSideContainer extends BaseComponent {


    static contextTypes ={
        router:PropTypes.object.isRequired,
    }


    _add = (title,component,key,props)=>{
        console.log(key);
        const
            panes = this.state.panes || []
        panes.push({ title,component,key,props});
        this.setState({ panes, activeKey:key});
    }

    _change = (activeKey)=>{
        if (this.state.activeKey !== activeKey) {
            this.setState({ activeKey });
        }
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

    add = (title,component,props={}) => {
        const
            panes = this.state.panes || [],
            // 不能使用外部变量储存，必须即时计算。
            // added = this.added = this.added || {},
            pane = panes.find(pane=>pane.title===title);
        if(pane){
            return this.change(pane.key);
        }
        this._add(title,component,""+((+(panes[panes.length-1]||{}).key||0)+1),props)
    }

    change = (activeKey)=>{
        this._change(activeKey);
    }



    // 应该是一个通过key remove的方法，key默认为index应该是该方法的语法糖。
    remove =  (targetKey) => {
        // this.context.router.history.goBack();
        this.stopAdd = true;
        this._remove(targetKey);
    }

    render() {
        let
            {side, content = [],type} = this.props;

        const
            hookRoutes = [],
            self = this,
            renderMenuChildren = (children)=>{
                return children.map((child, index) =>{
                    if (child.children) {
                        return <SubMenu title={child.title}>
                            {renderMenuChildren(child.children)}
                        </SubMenu>
                    } else {
                        const Hook = createReactClass({
                            componentDidMount(){
                                if (self.stopAdd) {
                                    self.stopAdd = false;
                                }else{
                                    setTimeout(()=>{
                                        // add里setState了，从而刷新Route，而Route会触发 Hook组件的componentDidMount
                                        let title = child.title;
                                        title = typeof title === 'string' ? title : title.key;
                                        if (!title) {
                                            console.error("请指定key！");
                                            return;
                                        }
                                        self.add(title,child.component,this.props);
                                    },0)
                                }

                            },
                            render(){
                                //占坑用的。
                                return <span/>
                            }
                        })
                        hookRoutes.push(<Route exact path={child.path} component={Hook}/>);
                        // 当 child.visibility =  false 时不显示。
                        return child.visibility !== false && <MenuItem item={child}><Link to={child.path}>{child.title}</Link></MenuItem>
                    }
                } ).filter(i=>i)
            },
            menus = renderMenuChildren(side);
        // 哪里一直在触发刷新
        // debugger

        return (
            <Layout className={['side-container',type]}>
                <Sider className='sider-menu-box' collapsible>
                    <div className="logo"/>
                    <Menu theme='dark' className='side-menu' mode="inline" onClick={({item})=>{
                        // item = item.props.item;
                        // this.add(item.title,item.component)
                    }}>
                        {
                            menus
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <div className='side-content-wrapper'>
                        <Content className="side-content">
                            {<Tabs
                                hideAdd
                                onTabClick={()=>this.stopAdd = true}
                                onChange = {(activeKey) => this.setState({ activeKey })}
                                activeKey={this.state.activeKey}
                                type="editable-card"
                                onEdit={(targetKey, action) =>this[action](targetKey)}
                            >
                                {(this.state.panes||[]).map((pane,index) => <Tabs.TabPane className='tab-panel' tab={pane.title} key={pane.key}>{<pane.component {...pane.props}  />}</Tabs.TabPane>)}
                            </Tabs>
                            }
                            {/*用于存放路由钩子*/}
                            <div style={{display:'none'}}>{hookRoutes}</div>
                        </Content>
                    </div>
                </Layout>
            </Layout>
        )
    }
}