import React from "react";
import BaseComponent from "../components/BaseComponent";
import { HashHistory,Route,Link } from 'react-router-dom'
import App from "./App";
import SideContainer from "../components/ant/ant-custom/SideContainer";
import 'moment/locale/zh-cn';


class Router extends BaseComponent{
    render(){
        return (<HashHistory>
            <SideContainer
                side={[
                    {title:'你好',component:App},
                    {title:'你好2',children:[
                            {title:'你好3',component:App},
                    ]},
                ]}
            />
        </HashHistory>)
    }
}

export default Router;