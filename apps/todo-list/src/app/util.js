/**
 * 防抖函数
 *
 * @param {Function} fn 要防抖的函数
 * @param {number} wait 防抖间隔，即多久没有抖动后才执行函数
 */
function debounce(fn, wait = 300) {
  /** 定时器，用于记录将要执行的任务 */
  let timer = -1;
  return args => {
    // 清除上一个记录的定时器
    // 如果 间隔时间 < wait，上一个计时器会在执行前被清除
    // 即实现防抖
    clearTimeout(timer);
    timer = setTimeout(() => fn(args), wait);
  };
}

/**
 * 节流函数
 *
 * @param {Function} fn 要节流的函数
 * @param {number} delay 节流延迟，即有事件触发时，每隔多长时间执行一次函数
 */
function throttle(fn, delay = 300) {
  /** 可运行（非节流）状态 */
  let runnable = true;
  return args => {
    // 如果处于不可运行（节流）状态，那么取消本次执行
    if (!runnable) { return; }
    // 如果可运行，重置为不可运行（节流）状态
    runnable = false;
    // 在 delay 重置为可运行（非节流）状态
    setTimeout(() => runnable = true, delay);
    return fn(args);
  };
}
