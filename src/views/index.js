import React from "react";
import BaseComponent from "../components/BaseComponent";
import { HashRouter,Route,Link } from 'react-router-dom'
import 'moment/locale/zh-cn';
import Home from "./Home";
import Login from "./Login";


class Router extends BaseComponent{
    render(){
        return (<HashRouter>
            <div>
                <Route exact path="/" component={Login}/>
                <Route exact path="/home" component={Home}/>
            </div>

        </HashRouter>)
    }
}

export default Router;