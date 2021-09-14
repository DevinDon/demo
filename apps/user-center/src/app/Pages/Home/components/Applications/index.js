import React from "react";
import { List, Card, Tooltip, Dropdown, Menu } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";

const itemMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com">
        1st menu Item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com">
        2nd menu Item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com">
        3rd menu Item
      </a>
    </Menu.Item>
  </Menu>
)

const Applications = ({ list }) => {
  return (
    <List
      className={styles.filterCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip key="download" title="下载">
                <DownloadOutlined />
              </Tooltip>,
              <Tooltip key="edit" title="编辑">
                <EditOutlined />
              </Tooltip>,
              <Tooltip key="share" title="分享 ">
                <ShareAltOutlined /> 
              </Tooltip>,
              <Dropdown overlay={itemMenu} key="ellipsis">
                <EllipsisOutlined />
              </Dropdown>
            ]}
          >
            asdf
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Applications;
