import React from 'react';
import { Menu} from 'antd';
import {AuthDiv} from 'components';
import styles from './index.module.css';
import Dns from './dns'


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ['basic']
    }
  }

  componentDidMount() {
  }

  render() {
    const {selectedKeys} = this.state;
    return (
      <AuthDiv auth="ssl.acme.view" className={styles.container}>
        <div className={styles.left}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            style={{border: 'none'}}
            onSelect={({selectedKeys}) => this.setState({selectedKeys})}>
            <Menu.Item key="dns">dns</Menu.Item>
            <Menu.Item key="host">host</Menu.Item>
          </Menu>
        </div>
        <div className={styles.right}>
          {selectedKeys[0] === 'dns' && <Dns />}
        </div>
      </AuthDiv>
    )
  }
}

export default Index
