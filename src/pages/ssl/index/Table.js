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
        title: '类型',
        dataIndex: 'ssl_type',
    }, {
        title: '域名',
        dataIndex: 'name',
    }, {
        title: '过期时间',
        dataIndex: 'expiration',
    },{
        title: '操作',
        width: 200,
        render: info => (
            <span>
                <LinkButton auth="ssl.ssl.edit" onClick={() => store.showForm(info)}>编辑</LinkButton>
                <Divider type="vertical" />
                <LinkButton auth="ssl.ssl.del" onClick={() => this.handleDelete(info)}>删除</LinkButton>
            </span>
        )
    }];
    handleConsole = (info) => {
        window.open(`/ssh/${info.id}`)
      };

    handleDelete = (text) => {
        Modal.confirm({
            title: '删除确认',
            content: `确定要删除【${text['name']}】?`,
            onOk: () => {
                return http.delete('/api/v1/ssl', { params: { id: text.id } })
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
        if (store.f_type) {
            data = data.filter(item => item['ssl_type'].toLowerCase().includes(store.f_type.toLowerCase()))
        }
        return (
            <React.Fragment>
                <Table rowKey="id" loading={store.isFetching} dataSource={data} columns={this.columns} />
                {store.formVisible && <ComForm />}
            </React.Fragment>
        )
    }
}

export default ComTable
