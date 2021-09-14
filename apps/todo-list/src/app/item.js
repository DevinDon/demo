import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './item.module.css';

/**
 * 组件 `<Item>`
 *
 * @param {Todo & triggerTodo & removeTodo} { title, completed, time, triggerTodo, removeTodo }
 */
export function Item({ title, completed, time, triggerTodo, removeTodo }) {
  return (
    <div className={styles.item}>
      <span className={styles.left}>
        <div className={styles.icon} onClick={() => triggerTodo(time)}>
          {completed ? <CheckCircleOutlined /> : <LoadingOutlined />}
        </div>
        <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</span>
      </span>
      <CloseCircleOutlined className={styles.delete} onClick={() => removeTodo(time)} />
    </div>
  );
}
