import React from 'react';
import PropTypes from 'prop-types';
import styles from './BasicLayout.scss';

import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

function BasicLayout(props) {
  return (
    <Layout className={styles.BasicLayout}>
      <Header className={styles.BasicLayout__header}>
        <h1>Grace Management</h1>
      </Header>
      <Content>{props.children}</Content>
      <Footer className={styles.BasicLayout__footer}>
        &copy; minung.han
      </Footer>
    </Layout>
  );
}

BasicLayout.propTypes = {};
BasicLayout.defaultProps = {};

export default BasicLayout;
