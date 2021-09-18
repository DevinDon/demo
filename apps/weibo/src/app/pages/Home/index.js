import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Row } from 'antd';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getHomeTimeline } from '../../actions/timeline';
import { LOGIN_URL } from '../../constants';
import CommentsList from './components/commentsList';
import Post from './components/post';
import styles from './index.module.scss';

const mapStateTimeline = state => state.timeline;

export const Home = () => {
  const dispatch = useDispatch();
  const {
    home: { posts = [], page = 1 } = {},
    current,
  } = useMappedState(mapStateTimeline);
  const newPage = useCallback(page => {
    dispatch(getHomeTimeline({ page: page + 1 }));
  }, [dispatch]);
  const handleInfiniteOnLoad = () => {
    newPage(page);
  };

  return (
    <div className={styles.container}>
      <Affix offsetTop={0}>
        <Row
          className={styles.appbar}
          justify="space-between"
          align="middle"
        >
          <a href={LOGIN_URL}><UserOutlined className={styles.icon} /></a>
          <div className={styles.appTitle}>Weibo</div>
          <Link to="/new"><EditOutlined className={styles.icon} /></Link>
        </Row>
      </Affix>
      <InfiniteScroll
        initialLoad
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore
      >
        {
          posts.map(({
            id,
            ...rest
          }) => (
            <div key={id}>
              <Post
                id={id}
                isCurrent={current === id}
                {...rest}
              />
              {
                current === id &&
                <CommentsList id={current} />
              }
            </div>
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default Home;
