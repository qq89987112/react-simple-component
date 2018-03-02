#使用
    <AutoCompleteWrapper dataIndex='title'  keyIndex='id'  onSearch={()=>base.searchProjectInfo().then(d=>d.list)} onSelect={v => onSelect && onSelect(v.id,v)} {...rest}/>