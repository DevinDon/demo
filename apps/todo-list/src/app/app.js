import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Item } from './item';
import { TodoForm } from './todo-form';

// Todo 的数据结构
// interface Todo {
//   title: string;
//   completed: boolean;
//   time: Date | number; // 为了便于存储
// }

/** 默认的待办事件列表 */
const DEFAULT_TODOS = [
  { title: '尝试新增一件待办事项', completed: false, time: Date.now() },
  { title: '已完成的事项', completed: true, time: Date.now() + 1 },
];

/**
 * 从 local storage 读取待办事件列表
 *
 * @returns {Todo[]} todos 返回待办事件列表
 */
function loadTodosFromLocal() {
  const todos = localStorage.getItem('todos');
  return todos && JSON.parse(todos);
}

/**
 * 将待办事件列表存储到 local storage 中
 *
 * @param {Todo[]} todos 待办事件列表
 *
 * @returns {void} void
 */
function saveTodosToLocal(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * 组件 App
 */
export function App() {

  /** 待办事件列表 */
  const [todos, setTodos] = useState(loadTodosFromLocal() || DEFAULT_TODOS);
  /** 筛选后的事件列表 */
  const [filteredTodos, setFilteredTodos] = useState(todos);

  /**
   * 新增待办事件, 绑定至 `<Item>` 组件上
   *
   * @param {string} title 待办事件的标题
   *
   * @returns {void} void
   */
  const addTodo = title => setTodos([{ title, completed: false, time: Date.now() }, ...todos]);

  /**
   * 更改指定的待办事件状态
   *
   * @param {number} time 待办事件添加的时间, 同时作为 key
   *
   * @returns {void} void
   */
  const triggerTodo = time => setTodos(
    todos.map(todo => {
      todo.time === time && (todo.completed = !todo.completed);
      return todo;
    })
  );

  /**
   * 移除指定的待办事件
   *
   * @param {number} time 待办事件提交的时间
   *
   * @returns {void} void
   */
  const removeTodo = time => setTodos(todos.filter(todo => todo.time !== time));

  // 当待办事件列表发生变动时, 自动存储至 local storage
  useEffect(() => {
    saveTodosToLocal(todos);
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <TodoForm addTodo={addTodo} todos={todos} setFilteredTodos={setFilteredTodos} />
        <div className={styles.list}>
          {
            filteredTodos.map(
              todo => <Item key={todo.time} triggerTodo={triggerTodo} removeTodo={removeTodo} {...todo} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
