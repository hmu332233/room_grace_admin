import React from 'react';
import PropTypes from 'prop-types';
import styles from './BasicLayout.scss';

import { Layout, Row, Col } from 'antd';
const { Header, Footer, Content } = Layout;

function BasicLayout(props) {
  return (
    <Layout className={styles.BasicLayout}>
      <Header className={styles.BasicLayout__header}>
        <h1>Grace Management</h1>
      </Header>
      <Content className={styles.BasicLayout__content}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={20} offset={2}>
            {props.children}
          </Col>
        </Row>
      </Content>
      <Footer className={styles.BasicLayout__footer}>
        &copy; minung.han
      </Footer>
    </Layout>
  );
}

BasicLayout.propTypes = {};
BasicLayout.defaultProps = {};

export default BasicLayout;
