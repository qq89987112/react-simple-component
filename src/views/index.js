import React from "react";
import BaseComponent from "../components/BaseComponent";
import { BrowserRouter,Route,Link } from 'react-router-dom'
import App from "./App";
import SideContainer from "../components/ant/ant-custom/SideContainer";



class Router extends BaseComponent{
    render(){
        return (<BrowserRouter>
            <SideContainer
                side={[
                    {title:'你好',component:App},
                    {title:'你好2',component:App},
                ]}
            />
        </BrowserRouter>)
    }
}

export default Router;