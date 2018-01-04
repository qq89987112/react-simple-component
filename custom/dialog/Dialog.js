import React from 'react';
import '../css/SideContainer.scss'

class Dialog extends React.Component {

    constructor(){
        super();
        this.showDialog = ()=>{

        }

        this.showDialogForResult = ()=>{

        }
    }

    render() {
        let
            {children: slot = []} = this.props;
        return (
            <div className="dialog-component">
                {slot}
            </div>
        )
    }
}

export default Dialog