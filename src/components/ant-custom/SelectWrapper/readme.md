export default class InRoomSKU extends BaseAntPage {
    render() {
        const {onChange,...rest} = this.props;
        return <SelectWrapper {...rest} placeholder='SKU' dataIndex='sku' request={()=>baquery.getAllBaseInfo().then(d=>d.allInStoreroomSKUList)} onChange={v=>onChange(v.sku)} />
    }
}
