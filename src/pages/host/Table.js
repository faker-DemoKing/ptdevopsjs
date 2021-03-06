import React from 'react';
import { observer } from 'mobx-react';
import { Table, Divider, Modal, message } from 'antd';
import { LinkButton } from 'components';
import ComForm from './Form';
import http from 'libs/http';
import store from './store';

@observer
class ComTable extends React.Component {
    componentDidMount() {
        store.fetchRecords()
    }

    columns = [{
        title: '序号',
        key: 'series',
        render: (_, __, index) => index + 1,
        width: 80
    }, {
        title: '类别',
        dataIndex: 'zone',
    }, {
        title: '主机名称',
        dataIndex: 'name',
    }, {
        title: '连接地址',
        dataIndex: 'hostname',
    }, {
        title: '端口',
        dataIndex: 'port'
    }, {
        title: '备注',
        dataIndex: 'desc',
        ellipsis: true
    }, {
        title: '操作',
        width: 200,
        render: info => (
            <span>
                <LinkButton auth="host.host.edit" onClick={() => store.showForm(info)}>编辑</LinkButton>
                <Divider type="vertical" />
                <LinkButton auth="host.host.del" onClick={() => this.handleDelete(info)}>删除</LinkButton>
                <Divider type="vertical" />
                <LinkButton auth="host.host.console" onClick={() => this.handleConsole(info)}>Console</LinkButton>
            </span>
        )
    }];

    handleConsole = (info) => {
        window.open(`/api/v1/host/ssh/${info.id}/?x-token=${localStorage.getItem('token')}`)
    };

    handleDelete = (text) => {
        Modal.confirm({
            title: '删除确认',
            content: `确定要删除【${text['name']}】?`,
            onOk: () => {
                return http.delete('/api/v1/host', { params: { id: text.id } })
                    .then(() => {
                        message.success('删除成功');
                        store.fetchRecords()
                    })
            }
        })
    };

    render() {
        let data = store.permRecords;
        if (store.f_name) {
            data = data.filter(item => item['name'].toLowerCase().includes(store.f_name.toLowerCase()))
        }
        if (store.f_zone) {
            data = data.filter(item => item['zone'].toLowerCase().includes(store.f_zone.toLowerCase()))
        }
        if (store.f_host) {
            data = data.filter(item => item['hostname'].toLowerCase().includes(store.f_host.toLowerCase()))
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
                {store.formVisible && <ComForm />}
            </React.Fragment>
        )
    }
}

export default ComTable
