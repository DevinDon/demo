import { Spin } from 'antd';
import styles from './index.module.scss';

export const Loading = ({ tip }) =>
  <div className={styles.spin}>
    <Spin size="large" />
    <p className={styles.tip}>{tip || '加载中，请稍候……'}</p>
  </div>;

export default Loading;
