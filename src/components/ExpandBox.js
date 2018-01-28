import React from 'react'


class ExpandBox extends React.Component {

    state = {
        expand: false
    }

    render() {
        let
            {children,style} = this.props,
            _style = {
                whiteSpace: this.state.expand ? 'normal' : 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                cursor:'pointer'
            };
            style = Object.assign(style,_style)

        return (
            <div className='expand-box' style={style} onClick={() => this.setState({expand: !this.state.expand})}>
                {children}
            </div>
        )
    }
}

export default ExpandBox