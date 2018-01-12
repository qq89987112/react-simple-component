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
                    <Link to="/"><i className="anticon icon-home"/><span>test</span></Link>
                ]}
                content={[
                    <Route exact path="/" component={App}/>
                ]}
            />
        </BrowserRouter>)
    }
}

export default Router;