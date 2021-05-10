import React from 'react';
import { observer } from 'mobx-react';
import { Table, Divider, Modal, message } from 'antd';
import { LinkButton } from 'components';
import AcmeForm from './dnsForm';
import http from 'libs/http';
import store from './dns_store';

@observer
class ComTable extends React.Component {
    componentDidMount() {
        store.fetchAcmeSettings()
    }

    columns = [{
        title: '序号',
        key: 'series',
        render: (_, __, index) => index + 1,
        width: 80
    }, {
        title: 'DNS类型',
        dataIndex: 'type',
    }, {
        title: 'user',
        dataIndex: 'user',
    }, {
        title: 'key',
        dataIndex: 'key',
    }, {
        title: '备注',
        dataIndex: 'desc',
        ellipsis: true
    }, {
        title: '操作',
        width: 200,
        render: info => (
            <span>
                <LinkButton auth="ssl.acme.dns_edit" onClick={() => store.showAcmeForm(info)}>编辑</LinkButton>
                <Divider type="vertical" />
                <LinkButton auth="ssl.acme.dns_del" onClick={() => this.handleDelete(info)}>删除</LinkButton>
                <Divider type="vertical" />
            </span>
        )
    }];

    handleDelete = (text) => {
        Modal.confirm({
            title: '删除确认',
            content: `确定要删除【${text['name']}】?`,
            onOk: () => {
                return http.delete('/api/v1/ssl/setting/acme', { params: { id: text.id } })
                    .then(() => {
                        message.success('删除成功');
                        store.fetchRecords()
                    })
            }
        })
    };

    render() {
        let data = store.permRecords;
        console.log(data)
        if (store.f_user) {
            data = data.filter(item => item['user'].toLowerCase().includes(store.f_user.toLowerCase()))
        }
        if (store.f_type) {
            data = data.filter(item => item['type'].toLowerCase().includes(store.f_type.toLowerCase()))
        }
        if (store.f_key) {
            data = data.filter(item => item['key'].toLowerCase().includes(store.f_key.toLowerCase()))
        }
        return (
            <React.Fragment>
                <Table rowKey="id" 
                loading={store.isFetching} 
                dataSource={data}
                columns={this.columns} 
                pagination={{
                    showSizeChanger: true,
                    showLessItems: true,
                    hideOnSinglePage: true,
                    pageSizeOptions: ['10', '20', '50', '100']
                }}/>
                {store.formVisible && <AcmeForm />}
            </React.Fragment>
        )
    }
}

export default ComTable
