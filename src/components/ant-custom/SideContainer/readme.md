## type='router'
(<SideContainer
        side={
            [
                <Link className='menu-item' to={match.url}><i className="anticon icon-home"/><FormattedMessage id='home' /></Link>,
                <Link className='menu-item' to={`${match.url}/query`}><i className="anticon icon-chaxun"/><FormattedMessage id='query' /></Link>,
                <Link className='menu-item' to={`${match.url}/input-registration`}><i className="anticon icon-ruku"/><FormattedMessage id='registration.input' /></Link>,
                <Link className='menu-item' to={`${match.url}/output-registration`}><i className="anticon icon-chuku"/> <FormattedMessage id='output.registration' /></Link>,
                <Link className='menu-item' to={`${match.url}/template-down`}><i className="anticon icon-mobanxiazai"/> <FormattedMessage id='template.download' /></Link>
            ]
        }
        content={[
            <AuthRoute  exact path={match.url} component={SystemMessage}/>,
            <AuthRoute  path={match.url + '/query'} component={Query}/>,
            <AuthRoute  path={match.url + '/input-registration'} component={InputRegistration}/>,
            <AuthRoute  path={match.url + '/output-registration'} component={OutputRegistration}/>,
            <AuthRoute  path={match.url + '/template-down'} component={TemplateDownload}/>
        ]}
    />)

## TabSideContainer
 <TabSideContainer
        side={[
        // 为了实现通过路径即可访问相应的页面，需要提供一个path属性
            {title:'你好',component:App,visible:false},
            {title:'你好2',children:[
                    {title:'你好3',component:App},
                ]},
        ]}
    />

