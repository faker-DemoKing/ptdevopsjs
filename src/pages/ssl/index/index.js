import React from 'react';
import { observer } from 'mobx-react';
import { Input, Button, Select } from 'antd';
import { SearchForm, AuthDiv, AuthCard } from 'components';
import store from './store';
import ComTable from './Table';
import AcmeForm from './AcmeForm';
// import { render } from 'react-dom';
import acmeSettingStore from '../setting/store'

@observer
class SSLIndex extends React.Component {
    componentDidMount(){
        acmeSettingStore.fetchAcmeSettings()
        
    }
    render(){
        return (
            <AuthCard auth="ssl.ssl.view">
                <SearchForm>
                    <SearchForm.Item span={6} title="证书类型">
                        <Select allowClear placeholder="请选择" value={store.f_type} onChange={v => store.f_type = v}>
                            {store.ssl_types.map(item => (
                                <Select.Option value={item} key={item}>{item}</Select.Option>
                            ))}
                        </Select>
                    </SearchForm.Item>
                    <SearchForm.Item span={6} title="域名">
                        <Input allowClear value={store.f_name} onChange={e => store.f_name = e.target.value} placeholder="请输入" />
                    </SearchForm.Item>
                    <SearchForm.Item span={6} title="到期时间">
                        <Input allowClear value={store.f_expiration} onChange={e => store.f_expiration = e.target.value} placeholder="请输入"/>
                    </SearchForm.Item>
                    <SearchForm.Item span={6}>
                        <Button type="primary" icon="sync" onClick={store.fetchRecords}>刷新</Button>
                    </SearchForm.Item>
                </SearchForm>
                <AuthDiv auth="ssl.ssl.add" style={{ marginBottom: 16 }}>
                    <Button type="primary" icon="plus" onClick={() => store.showForm()}>新建</Button>
                </AuthDiv>
                <AuthDiv auth="ssl.setting.acme.add" style={{ marginBottom: 16 }}>
                    <Button type="primary" icon="plus" onClick={() => store.showAcmeForm()}>新建acme</Button>
                </AuthDiv>
                {store.acmeFormVisible && <AcmeForm />}
                <ComTable />
                
            </AuthCard>
        )
    }
}
export default SSLIndex