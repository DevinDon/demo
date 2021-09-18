import { LikeOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import moment from 'moment';
import { useDispatch } from 'redux-react-hook';
import notFoundSvg from '../../../../../assets/404.svg';
import { setCurrentPost } from '../../../../actions/timeline';
import styles from './index.module.scss';

export const getPostTitle = (
  user,
  created_at,
  source,
) => (
  <div className={styles.user}>
    <img
      src={user?.profile_image_url || notFoundSvg}
      className={styles.avatar}
      alt={user.screen_name}
    />
    <div className={styles.userInfo}>
      <div>{user.screen_name}</div>
      <div className={styles.extra}>
        {moment(new Date(created_at)).fromNow()} 来自 <span dangerouslySetInnerHTML={{ __html: source }} />
      </div>
    </div>
  </div>
);

const Post = ({
  id,
  text,
  user,
  created_at,
  source,
  pic_urls,
  reposts_count,
  attitudes_count,
  comments_count,
  retweeted_status,
  type,
  isCurrent,
}) => {
  const dispatch = useDispatch();
  const handleClickRetweet = () => {
    message.info('暂不支持转发操作');
  };
  const handleClickLike = () => {
    message.info('暂不支持点赞操作');
  };
  const handleClickComment = () => {
    dispatch(setCurrentPost({ id: isCurrent ? null : id }));
  };

  return (
    <Card
      type={type}
      className={styles.post}
      bordered={false}
      hoverable
      title={
        getPostTitle(
          user,
          created_at,
          source,
        )
      }
      actions={type ? [] : [
        <div key="retweet" onClick={handleClickRetweet}>
          <RetweetOutlined />
          <span> {reposts_count || ''}</span>
        </div>,
        <div key="like" onClick={handleClickLike}>
          <LikeOutlined />
          <span> {attitudes_count || ''}</span>
        </div>,
        <div key="message" onClick={handleClickComment} >
          <MessageOutlined />
          <span> {comments_count || ''}</span>
        </div>,
      ]}
    >
      <div className={styles.content}>
        <div className={styles.text}>
          {text}
          {
            retweeted_status &&
            <Post type="inner" {...retweeted_status} />
          }
        </div>
        <ul className={styles.images}>
          {
            pic_urls.map(({ thumbnail_pic }) => (
              <li key={thumbnail_pic} className={styles.imgWrapper}>
                <div className={styles.imgContainer}>
                  <img src={thumbnail_pic}
                    alt={thumbnail_pic}
                    onError={({ currentTarget }) => currentTarget.src = notFoundSvg}
                  />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </Card>
  );
};

export default Post;
