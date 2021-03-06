import React from 'react';
import { Menu} from 'antd';
import {AuthDiv} from 'components';
import styles from './index.module.css';


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
      <AuthDiv auth="ssl.setting.view" className={styles.container}>
        <div className={styles.left}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            style={{border: 'none'}}
            onSelect={({selectedKeys}) => this.setState({selectedKeys})}>
            {/* <Menu.Item key="acme">acme</Menu.Item> */}
          </Menu>
        </div>
        {/* <div className={styles.right}>
          {selectedKeys[0] === 'acme' && <Acme />}
        </div> */}
      </AuthDiv>
    )
  }
}

export default Index
