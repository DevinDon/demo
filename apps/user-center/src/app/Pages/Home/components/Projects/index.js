import React from "react";
import { Card, List } from "antd";
import moment from "moment";
import styles from "./index.module.less";

const Projects = ({ list }) => {
  return (
    <List
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a href="/">{item.title}</a>}
              description={item.subDescription}
            />
            <div className={styles.moment}>
              <span>{moment(item.updateAt).fromNow()}</span>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Projects;
