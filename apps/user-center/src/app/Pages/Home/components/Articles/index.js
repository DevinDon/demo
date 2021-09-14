import React from 'react';
import { List, Tag } from 'antd';
import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import ArticleListContent from '../ArticleListContent';
import styles from './index.module.less';

const IconText = ({ icon, text }) => (
  <span>
    {icon} {text}
  </span>
);

const Articles = ({ list }) => {
  return (
    <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical" 
      dataSource={list}
      renderItem={(item) => (
        <List.Item 
          key={item.id}
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            <IconText key="message" icon={<MessageFilled />} text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>Web Development</Tag>
                <Tag>Design Languange</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default Articles;
