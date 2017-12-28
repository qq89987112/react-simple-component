import React from "react";

class BaseComponent extends React.Component{

    constructor(){
        super();
        this.onInput = (name)=>{
            return (event)=>{
                const target = event.target;
                const value = target.type === 'checkbox' ? target.checked : target.value;
                // const name = target.name;
                this.setState({
                    [name]: value
                });
            }

        }
    }

    $toast(){
        console.log('$toast');
    }


}

export default BaseComponent;