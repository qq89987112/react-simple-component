import React from 'react';
import { Route } from 'react-router-dom'

export default class MRoute extends React.Component {

    state = {}

    componentWillMount() {
        const {getComponent} = this.props;
        getComponent&&getComponent().then((component)=>{
            this.setState({
                component:component.default
            })
        })
    }

    render() {
        // const {component = <div/>} = this.state;
        const {component} = this.state;
        return <Route {...this.props} component={component}/>
    }
};