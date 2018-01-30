import React from "react";
import BaseComponent from "../components/BaseComponent";
import { HashRouter,Route,Link,Redirect } from 'react-router-dom'
import 'moment/locale/zh-cn';
import Home from "./Home";
import Login from "./Login";


class Router extends BaseComponent{
    render(){
        return (<HashRouter>
            <div>
                <Redirect to='/login'/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component={Home}/>
            </div>

        </HashRouter>)
    }
}

export default Router;