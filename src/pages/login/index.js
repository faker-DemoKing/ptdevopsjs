import React from 'react';
import { Form, Input, Icon, Button, Tabs, Modal, message } from 'antd';
// import cookie from 'react-cookies';
import styles from './login.module.css';
import logo from 'layout/logo-text.png';
import md5 from 'md5';
import history from 'libs/history';
import { http, updatePermissions } from 'libs';
import envStore from 'pages/config/environment/store';
import requestStore from 'pages/deploy/request/store';

class LoginIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loginType: 'default',
            // username: cookie.load('username')
        }
    }

    componentDidMount() {
        envStore.records = [];
        requestStore.records = [];
        requestStore.deploys = []
    }
    loginSuccess = (data) => {
        if (!data['has_real_ip']) {
            Modal.warning({
                title: '安全警告',
                className: styles.tips,
                content: <div>
                        未能获取到客户端的真实IP，无法提供基于请求来源IP的合法性验证，详细信息请参考
                        <a target="_blank" href="" rel="noopener noreferrer">官方文档</a>。
                    </div>,
                onOk: () => this.doLogin(data)
            })
        } else {
            this.doLogin(data)
        }
    }
    requestFailed = (err) => {
        const data = err.response.data.message
        message.error('错误: ' + data, 3)
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, formData) => {
            if (!err) {
                this.setState({ loading: true });
                formData['type'] = this.state.loginType;
                formData['password'] = md5(formData['password'])
                let username = formData['username']
                this.setState({ username });
                http.post('/api/v1/account/login', formData)
                    .then(data => this.loginSuccess(data), () => this.setState({ loading: false }))
                    .catch((err) => this.requestFailed(err))
            } else {
                message.error(err, 3)
            }
        })
    };

    doLogin = (data) => {
        localStorage.setItem('token', data['access_token']);
        localStorage.setItem('nickname', data['nickname']);
        localStorage.setItem('is_supper', data['is_supper']);
        localStorage.setItem('permissions', JSON.stringify(data['permissions']));
        localStorage.setItem('host_perms', JSON.stringify(data['host_perms']));
        updatePermissions(data['is_supper'], data['permissions']);
        if (history.location.state && history.location.state['from']) {
            history.push(history.location.state['from'])
        } else {
            history.push('/welcome/index')
        }
    };

    render() {
        if (localStorage.getItem('nickname')){
            history.goBack()
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div><img className={styles.logo} src={logo} alt="logo" /></div>
                    <div className={styles.desc}>装逼不在状态？</div>
                </div>
                <div className={styles.formContainer}>
                    <Tabs classNam={styles.tabs} onTabClick={e => this.setState({ loginType: e })}>
                        <Tabs.TabPane tab="普通登录" key="default" />
                        <Tabs.TabPane tab="LDAP登录" key="ldap" />
                    </Tabs>
                    <Form>
                        <Form.Item className={styles.formItem}>
                            {getFieldDecorator('username', { rules: [{ required: true, message: '请输入账户' }] })(
                                <Input
                                    size="large"
                                    autoComplete="off"
                                    placeholder="请输入账户"
                                    prefix={<Icon type="user" className={styles.icon} />} />
                            )}
                        </Form.Item>
                        <Form.Item className={styles.formItem}>
                            {getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }] })(
                                <Input
                                    size="large"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="请输入密码"
                                    onPressEnter={this.handleSubmit}
                                    prefix={<Icon type="lock" className={styles.icon} />} />
                            )}
                        </Form.Item>
                    </Form>

                    <Button
                        block
                        size="large"
                        type="primary"
                        className={styles.button}
                        loading={this.state.loading}
                        onClick={this.handleSubmit}>登录</Button>
                </div>

                <div className={styles.footerZone}>
                    <div className={styles.linksZone}>
                        <a className={styles.links} title="官网" href="" target="_blank"
                            rel="noopener noreferrer">官网</a>
                        <a className={styles.links} title="Github" href="" target="_blank"
                            rel="noopener noreferrer"><Icon type="github" /></a>
                        <a title="文档" href="" target="_blank"
                            rel="noopener noreferrer">文档</a>
                    </div>
                    <div style={{ color: 'rgba(0, 0, 0, .45)' }}>Copyright <Icon type="copyright" /> 2019 By OpenSpug</div>
                </div>
            </div>
        )
    }
}


export default Form.create()(LoginIndex)
