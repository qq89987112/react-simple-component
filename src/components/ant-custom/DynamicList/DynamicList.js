import React from 'react';
import {Select,Button,Icon} from 'antd'
import "./DynamicList.scss"
import BaseComponent from "../ant-custom/BaseAntPage";

const
    Option = Select.Option;


//<DynamicList
//    defaultList={list}
//    renderItem={(item,index)=>{
//        return <Input key={index} defaultValue={item.title} onInput={this.$onInput(v=>item.title=v)} />
//    }}
//    renderAdd={(instance)=>
//        <p className='tac'>
//            <Button onClick={instance.add}>{this.$f('add')}</Button>
//            <Button onClick={()=>{
//                this.$load('submit');
//                onSubmit&&onSubmit({
//                    title:instance.state.list.map(i=>i.title)
//                }).then(()=>{
//                    this.$cancel('submit')
//                });
//            }}>{this.$f('submit')}</Button>
//        </p>}
///>
export default class DynamicList extends BaseComponent {

    state = {
        list:[]
    }

    componentWillMount(){
        const {defaultList=[]} = this.props;
        this.setState({
            list:[...defaultList]
        })
    }

    add = ()=>{
        const {list} = this.state;
        const {defaultList=[]} = this.props;
        let empty = {};
        defaultList.push(empty);
        this.setState({
            list:list.concat(empty)
        })
    }

    render() {
        let {  renderItem=()=>{},renderAdd=()=>{}} = this.props;
        const {list} = this.state;
        const {defaultList=[]} = this.props;
        return (
            <div className='dynamic-list-component'>
                {
                    list&&list.map((item,index)=><div key={index} className="dynamic-list-item">
                        {renderItem(item,index)}
                        <Icon
                            onClick={()=>{
                                this.setState({
                                    list:undefined
                                })
                                let arr = this.state.list;
                                arr.splice(index,1);
                                defaultList.splice(index,1);
                                setTimeout(()=>this.setState({
                                    list: arr
                                }),0);
                            }} className='icon' type='close-circle-o' style={{marginLeft:10}} /></div>)
                }
                <div class="footer">
                    {
                        renderAdd(this) || <p style={{textAlign:'center'}}><Button type='primary' onClick={this.add}>{this.$f('add')}</Button></p>
                    }
                </div>
            </div>
        )
    }
}


