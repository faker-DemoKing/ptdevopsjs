import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Input, Select, Col, Button, message } from 'antd';
import http from 'libs/http';
import store from './dns_store';

@observer
class ComForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            type: null,
        }
    }

    handleSubmit = () => {
        this.setState({ loading: true });
        const formData = this.props.form.getFieldsValue();
        formData['id'] = store.record.id;
        http.post('/api/v1/ssl/setting/acme/dns', formData)
            .then(res => {
                message.success('操作成功');
                store.formVisible = false;
                store.fetchAcmeSettings()
            }, () => this.setState({ loading: false }))
    };

    handleAddType = () => {
        Modal.confirm({
            icon: 'exclamation-circle',
            title: '添加DNS类别',
            content: this.addTypeForm,
            onOk: () => {
                if (this.state.type) {
                    store.acme_dns_types.push(this.state.type);
                    this.props.form.setFieldsValue({ 'acme_dns_type': this.state.type })
                }
            },
        })
    };
    
    handleEditType = () => {
        this.setState({ type: store.record.type }, () => {
            Modal.confirm({
                icon: 'exclamation-circle',
                title: '编辑DNS类型',
                content: (
                    <Form>
                        <Form.Item required label="DNS类型" help="该操作将批量更新所有属于该类别的用户信息并立即生效，如过只是想修改单个用户信息的类别请使用添加类别或下拉框选择切换类别。">
                            <Input defaultValue={store.record.type} onChange={e => this.setState({ editType: e.target.value })} />
                        </Form.Item>
                    </Form>
                ),
                onOk: () => http.patch('/api/v1/ssl/setting/acme', { id: store.record.id, type: this.state.editType })
                    .then(res => {
                        message.success(`成功修改${res}条记录`);
                        store.fetchRecords();
                        this.props.form.setFieldsValue({ 'type': this.state.editType })
                    })
            })
        });
    };

    addTypeForm = (
        <Form>
            <Form.Item required label="DNS类型">
                <Input onChange={val => this.setState({ type: val.target.value })} />
            </Form.Item>
        </Form>
    );


    render() {
        const info = store.record;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible
                width={800}
                maskClosable={false}
                title={store.record.id ? '编辑' : '新建'}
                okText="验证"
                onCancel={() => store.formVisible = false}
                confirmLoading={this.state.loading}
                onOk={this.handleSubmit}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Form.Item required label="DNS类型">
                        <Col span={14}>
                            {getFieldDecorator('acme_dns_type', { initialValue: info['acme_dns_type'], rules: [{ required: true, message: '请输入主机类别/区域/分组' }] })(
                                <Select placeholder="请选择dns类型">
                                    {store.acme_dns_types.map(item => (
                                        <Select.Option value={item} key={item}>{item}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Col>
                        <Col span={4} offset={1}>
                            <Button type="link" onClick={this.handleAddType}>添加类别</Button>
                        </Col>
                        <Col span={4} offset={1}>
                            <Button type="link" onClick={this.handleEditType}>编辑类别</Button>
                        </Col>
                    </Form.Item>
                    <Form.Item required label="用户名/secert">
                        {getFieldDecorator('user', { initialValue: info['user'], rules: [{ required: true, message: '请输入用户名/secert' }]  })(
                            <Input placeholder="请输入用户名/secert" />
                        )}
                    </Form.Item>
                    <Form.Item required label="key">
                        {getFieldDecorator('key', { initialValue: info['key'], rules: [{ required: true, message: '请输入用户名/secert' }]  })(
                            <Input placeholder="请输入key" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(ComForm)
