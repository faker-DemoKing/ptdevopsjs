import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Input, Select, Col, message  } from 'antd';
import http from 'libs/http';
import store from './store';
import acmeSettingStore from '../setting/store'


@observer
class ComForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ssl_type: null,
            sortAcmes: [],
        }
    }

    handleAcmeChange = value => {
        this.props.form.setFieldsValue({
            user: acmeSettingStore.fetchSortAcme(value)[0] ? acmeSettingStore.fetchSortAcme(value)[0].user : ' '
        })
        this.setState({
            sortAcmes: acmeSettingStore.fetchSortAcme(value),
        })
    }

    handleSubmit = () => {
        const formData = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, data) => {
          if (!err) {
            this.setState({loading: true});
            http.post('/api/v1/ssl', formData)
              .then(() => {
                message.success('保存成功');
                store.acmeFormVisible = false
                store.fetchRecords()
                
              })
              .finally(() => this.setState({loading: false}))
          }
        })
    };
    
    render() {
        const { sortAcmes } = this.state
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <Modal
                visible
                width={800}
                maskClosable={false}
                title={'新建acme'}
                okText="提交"
                onCancel={() => store.acmeFormVisible = false}
                confirmLoading={this.state.loading}
                onOk={this.handleSubmit}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Form.Item required label="acme类型">
                        <Col span={14}>
                            {getFieldDecorator('acme_type', {  rules: [{ required: true, message: '请选择acme类型' }] })(
                                <Select  onChange={this.handleAcmeChange} placeholder="请选择acme类型">
                                    {acmeSettingStore.acme_types.map(item => (
                                        <Select.Option  key={item}>{item}</Select.Option>
                                    ))}
                                
                                </Select>
                            )}
                            
                        </Col>
                    </Form.Item>

                    <Form.Item required label={getFieldValue('acme_type') ? getFieldValue('acme_type') + ' user' : ' ' + ' user' } >
                        <Col span={14}>
                            {getFieldDecorator('user', {  rules: [{ required: true, message: '请选择acme类型' }] })(
                                <Select  placeholder={'请选择'+getFieldValue('acme_type')+'的user'}>
                                    {sortAcmes.map(item => (
                                        <Select.Option key={item.user}>{item.user}</Select.Option>
                                    ))}
                                </Select>
                            )} 
                        </Col>
                    </Form.Item> 
                    <Form.Item required label="域名">
                        {getFieldDecorator('domain_name', { rules: [{ required: true, message: '请输入证书域名' }]  })(
                            <Input placeholder="请输入证书域名" />
                        )}
                    </Form.Item>
                    <Form.Item required label="证书域名">
                        {getFieldDecorator('ssl_name', { initialValue:'*', rules: [{ required: true, message: '请输入证书域名' }]  })(
                            <Input placeholder="请输入证书域名" />
                        )}
                    </Form.Item>
                    <Form.Item required label="challenge-alias" style={{ marginBottom: 0 }}>
                        {getFieldDecorator('chall_domain', {  rules: [{ required: true, message: '请输入challenge-alias域名' }]  })(
                            <Input placeholder="请输入challenge-alias域名" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(ComForm)
