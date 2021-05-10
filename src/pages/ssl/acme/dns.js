import React from 'react';
import {observer} from 'mobx-react';
import {Button, Form, Input, Select, message } from 'antd';
// import {http} from 'libs';
import store from './dns_store';
import { SearchForm, AuthDiv, AuthCard } from 'components';
import Table from './dnsTable'

@observer
class Dns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
        }
    }
    // handleSubmit = () => {
    //     const formData = [];
    //     this.props.form.validateFields((err, data) => {
    //       if (!err) {
    //         this.setState({loading: true});
    //         formData.push({key: 'acme', value: JSON.stringify(data)});
    //         http.post('/api/v1/ssl/setting', {data: formData})
    //           .then(() => {
    //             message.success('保存成功');
    //             store.fetchSettings()
    //           })
    //           .finally(() => this.setState({loading: false}))
    //       }
    //     })
    // };

    render() {
        return (
            <AuthCard auth="ssl.acme.dns_view">
            <SearchForm>
                <SearchForm.Item span={6} title="DNS类型">
                    <Select allowClear placeholder="请选择" value={store.f_type} onChange={v => store.f_type = v}>
                        {store.acme_dns_types.map(item => (
                            <Select.Option value={item} key={item}>{item}</Select.Option>
                        ))}
                    </Select>
                </SearchForm.Item>
                <SearchForm.Item span={6} title="user">
                    <Input allowClear value={store.f_user} onChange={e => store.f_user = e.target.value} placeholder="请输入" />
                </SearchForm.Item>
                <SearchForm.Item span={6} title="key">
                    <Input allowClear value={store.f_key} onChange={e => store.f_key= e.target.value} placeholder="请输入"/>
                </SearchForm.Item>
                <SearchForm.Item span={6}>
                    <Button type="primary" icon="sync" onClick={store.fetchAcmeSettings}>刷新</Button>
                </SearchForm.Item>
            </SearchForm>
            <AuthDiv auth="ssl.acme.dns_add" style={{ marginBottom: 16 }}>
                <Button type="primary" icon="plus" onClick={() => store.showAcmeForm()}>新建</Button>
            </AuthDiv>
            <Table />
        </AuthCard>

        )
    }
    
}

export default Form.create()(Dns)