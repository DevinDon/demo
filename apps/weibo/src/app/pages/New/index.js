import { LeftOutlined } from '@ant-design/icons';
import { Affix, Input, message, Row } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';
import { addPost } from '../../actions/timeline';
import { getUid } from '../../constants';
import styles from './index.module.scss';

const { TextArea } = Input;

export const New = ({ history }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const handleClick = e => {
    e.preventDefault();
    if (!getUid()) {
      message.error('请先返回首页登录');
      return;
    }
    dispatch(addPost({ text: value }))
      .then(() => {
        setValue('');
        message.success('发布成功');
        history.push('/');
      })
      .catch(err => {
        message.error('发布失败，请检查网络连接或重新登录');
      });
  };
  return (
    <div className={styles.container}>
      <Affix offsetTop={0}>
        <Row
          className={styles.appbar}
          justify="space-between"
          align="middle"
        >
          <Link to="/"><LeftOutlined /></Link>
          <a
            className={styles.send}
            href="#!"
            onClick={handleClick}
          >
            发送
          </a>
        </Row>
      </Affix>
      <div className={styles.content}>
        <TextArea
          value={value}
          className={styles.textarea}
          placeholder="分享你的新鲜事..."
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default New;
