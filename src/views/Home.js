import React from "react";
import BaseComponent from "../components/BaseComponent";
import App from "./App";
import SideContainer from "../components/ant-custom/SideContainer/RouteSideContainer";



class Home extends BaseComponent{
    render(){
        return (
            <SideContainer
                side={[
                    {title:'你好',component:App},
                    {title:'你好2',children:[
                            {title:'你好3',component:App},
                        ]},
                ]}
            />
        )
    }
}

export default Home;