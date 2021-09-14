/**
 * 组件 `<Input>`
 *
 * @param {addTodo} param0 { addTodo }
 */
export function Input({ addTodo }) {

  /**
   * 检测回车，添加新待办事件，并清空输入框
   *
   * @param {Event} event input 按键事件
   *
   * @returns {void} void
   */
  const handleEnter = event => {
    if (event.key !== 'Enter') { return; }
    addTodo(event.currentTarget.value);
    event.currentTarget.value = '';
  };

  return (
    <input
      className="input"
      type="text"
      placeholder="新增一条待办事项..."
      onKeyDown={handleEnter}
    />
  );

}
