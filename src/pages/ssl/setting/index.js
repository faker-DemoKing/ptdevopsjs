/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the AGPL-3.0 License.
 */
import React from 'react';
import { Menu} from 'antd';
import {AuthDiv} from 'components';
import AcmeSetting from './AcmeSetting';
import styles from './index.module.css';
import store from './store';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ['basic']
    }
  }

  componentDidMount() {
    store.fetchSettings()
  }

  render() {
    const {selectedKeys} = this.state;
    return (
      <AuthDiv auth="ssl.setting.view" className={styles.container}>
        <div className={styles.left}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            style={{border: 'none'}}
            onSelect={({selectedKeys}) => this.setState({selectedKeys})}>
            <Menu.Item key="acme">acme</Menu.Item>
          </Menu>
        </div>
        <div className={styles.right}>
          {selectedKeys[0] === 'acme' && <AcmeSetting />}
        </div>
      </AuthDiv>
    )
  }
}

export default Index
