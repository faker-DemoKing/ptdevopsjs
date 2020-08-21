import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Input, Select, Col, Button, message } from 'antd';
import http from 'libs/http';
import store from './store';

@observer
class ComForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ssl_type: null,
            disabled: true
        }
    }

    handleSubmit = () => {
        const formData = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, data) => {
          if (!err) {
            this.setState({loading: true});
            http.post('/api/v1/ssl', formData)
              .then(() => {
                message.success('保存成功');
                store.formVisible = false
                store.fetchRecords()
              })
              .finally(() => this.setState({loading: false}))
          }
        })
    };

    handleAddType = () => {
        Modal.confirm({
            icon: 'exclamation-circle',
            title: '添加主机类别',
            content: this.addTypeForm,
            onOk: () => {
                if (this.state.ssl_type) {
                    store.ssl_types.push(this.state.ssl_type);
                    this.props.form.setFieldsValue({ 'ssl_type': this.state.ssl_type })
                }
            },
        })
    };
    
    handleEditType = () => {
        this.setState({ ssl_type: store.record.ssl_type }, () => {
            Modal.confirm({
                icon: 'exclamation-circle',
                title: '编辑证书类别',
                content: (
                    <Form>
                        <Form.Item required label="证书类别" help="该操作将批量更新所有属于该类别的证书并立即生效，如过只是想修改单个证书的类别请使用添加类别或下拉框选择切换类别。">
                            <Input defaultValue={store.record.ssl_type} onChange={e => this.setState({ editSSL_type: e.target.value })} />
                        </Form.Item>
                    </Form>
                ),
                onOk: () => http.patch('/api/v1/ssl', { id: store.record.id, ssl_type: this.state.editSSL_type })
                    .then(res => {
                        message.success(`成功修改${res}条记录`);
                        store.fetchRecords();
                        this.props.form.setFieldsValue({ 'ssl_type': this.state.editSSL_type })
                    })
            })
        });
    };

    addTypeForm = (
        <Form>
            <Form.Item required label="证书类型">
                <Input onChange={val => this.setState({ ssl_type: val.target.value })} />
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
                title={store.record.id ? '编辑证书' : '新建证书'}
                okText="提交"
                onCancel={() => store.formVisible = false}
                confirmLoading={this.state.loading}
                onOk={this.handleSubmit}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                    <Form.Item required label="证书类型">
                        <Col span={14}>
                            {getFieldDecorator('ssl_type', { initialValue: info['ssl_type'], rules: [{ required: true, message: '请输入证书类型' }] })(
                                <Select placeholder="请选择证书类型">
                                    {store.ssl_types.map(item => (
                                        <Select.Option  disabled={item==='acme'? this.state.disabled : !this.state.disabled} value={item} key={item}>{item}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Col>
                        <Col span={4} offset={1}>
                            <Button disabled={ ( info['name'] === 'acme' ) ? this.state.disabled : !this.state.disabled } type="link" onClick={this.handleAddType}>添加类型</Button>
                        </Col>
                        <Col span={4} offset={1}>
                            <Button type="link" onClick={this.handleEditType}>编辑类型</Button>
                        </Col>
                    </Form.Item>
                    <Form.Item required label="证书域名">
                        {getFieldDecorator('name', { initialValue: info['name'], rules: [{ required: true, message: '请输入证书域名' }]  })(
                            <Input placeholder="请输入证书域名" />
                        )}
                    </Form.Item>
                    <Form.Item required label="证书内容" style={{ marginBottom: 0 }}>
                        {getFieldDecorator('cer', { initialValue: info['cer'], rules: [{ required: true, message: '请输入证书内容' }]  })(
                            <Input.TextArea placeholder="请输入证书内容" />
                        )}
                    </Form.Item>
                    <Form.Item required label="证书密钥" style={{ marginBottom: 0 }}>
                        {getFieldDecorator('key', { initialValue: info['key'], rules: [{ required: true, message: '请输入证书密钥' }]  })(
                            <Input.TextArea placeholder="请输入证书密钥" />
                        )}
                    </Form.Item>
                    <Form.Item required label="过期时间" style={{ marginBottom: 0 }}>
                        {getFieldDecorator('expiration', { initialValue: info['expiration'], rules: [{ required: true, message: '请输入过期时间' }]  })(
                            <Input.TextArea placeholder="请输入过期时间" />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(ComForm)
