/**
 * 这个函数帮助你判断对象是否包含某个属性（不做原型链条上的递归判断）
 * 如果你需要判断包含原型链在内的某个属性，请使用 `in` 表达式去做判断
 * @param {Object} obj 需要判断的对象
 * @param {String} prop 属性名称
 * @returns {Boolean} 返回一个布尔值
 */
function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * 这个函数帮助你轻松判断任意变量的类型
 * @param {any} el 任意类型的数据结构
 * @returns {String} 返回数据结构类型
 */
function type(el) {
  return Object.prototype.toString.call(el).slice(8, -1)
}

/**
 * 对象遍历器，类似于 数组的 forEach 方法，回调函数返回值如果为真
 * 就终止执行遍历器
 * @param {Object} obj 需要遍历的对象
 * @param {Function} func 回调函数
 */
function eachProp(obj, func) {
  var prop
  for (prop in obj) {
    if (hasProp(obj, prop)) {
      if (func(obj[prop], prop)) {
        break
      }
    }
  }
}

/**
 * 深拷贝一个对象
 * @param {Object} obj 需要拷贝的对象
 * @returns {Object} 返回的对象
 */
function deepCopy(obj) {
  const target = {}
  eachProp(obj, function(value, key) {
    if (obj && type(value) === 'Object') {
      target[key] = deepCopy(value)
    } else {
      target[key] = value
    }
  })

  return target
}

export { deepCopy, eachProp, type, hasProp }
