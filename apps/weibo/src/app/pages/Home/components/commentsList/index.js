import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, List, message, Modal, Row } from 'antd';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { createComment, deleteComment, getComments } from '../../../../actions/comments';
import { COMMENT_PAGESIZE, getUid } from '../../../../constants';
import styles from './index.module.scss';

const mapStateComments = state => state.comments;
const uid = getUid();
const { confirm } = Modal;

export const CommentsList = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const { comments = [], page = 0, total = 0 } = useMappedState(mapStateComments);
  const handleInfiniteOnLoad = useCallback(() => {
    dispatch(getComments({ id, page: page + 1, count: COMMENT_PAGESIZE }));
  }, [dispatch, id, page]);

  useEffect(() => {
    handleInfiniteOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadMore = page * COMMENT_PAGESIZE < total && (
    <div className={styles.loadMore}>
      <Button onClick={handleInfiniteOnLoad}>加载更多</Button>
    </div>
  );

  const handleSendComment = () => {
    if (!getUid()) {
      message.error('请先点击左上角登录');
      return;
    }
    let param = new URLSearchParams();
    param.append('id', id);
    param.append('comment', value);
    dispatch(createComment(param, false));
    setValue('');
  };

  const handleDeleteComment = (e, id) => {
    e.preventDefault();
    let param = new URLSearchParams();
    param.append('cid', id);
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除这条评论吗？',
      onOk() {
        dispatch(deleteComment(param));
      }
    });
  };

  return (
    <Card className={styles.commentsList}>
      <Row>
        <Col span={20}>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Col>
        <Col span={4}>
          <Button
            onClick={handleSendComment}
            type="primary"
          >
            评论
          </Button>
        </Col>
      </Row>
      <List
        loadMore={loadMore}
        dataSource={comments}
        renderItem={({ user = {}, id, text, created_at }) => (
          <List.Item
            key={id}
            actions={
              uid === user.idstr ?
                [<a href="#!" key={id} onClick={e => handleDeleteComment(e, id)}>删除</a>] : []
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar src={user.avatar_hd} />
              }
              title={
                <div>
                  <span>{user.name}</span>
                  <span className={styles.extra}>
                    {moment(new Date(created_at)).fromNow()}
                  </span>
                </div>
              }
              description={text}
            />
          </List.Item>
        )}
      >
      </List>
    </Card>
  );
};

export default CommentsList;
