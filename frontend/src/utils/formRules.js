
var isOnlyChange = (trigger) => trigger == 'change' || (Array.isArray(trigger) && trigger.length == 1 && trigger[0] == 'change')
// 一般检验
function rule_common(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error(msg || '内容不能为空'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 数字检验
function rule_number(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error(msg || '内容不能为空'))
      }
      if (!(/(^[1-9]\d*$)/.test(value))) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    },
    trigger
  }
}

// 年龄校验
function rule_age(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/// 年龄是1-120之间有效
      if (!value) {
        callback(new Error(msg || '年龄不能为空'))
      } else if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入正确的年龄'))
      } else {
        callback()
      }
    }
  }
}

// 账号用户名
function rule_username(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_-]{4,16}$/
      if (!value) {
        callback(new Error(msg || '内容不能为空'))
      } else if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入4-16位包含字母、数字、下划线、短横线的用户名'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 电话号码校验
function rule_phone(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^1\d{10}$|^(0\d{2,3}-?|0\d2,3)?[1-9]\d{4,7}(-\d{1,8})?$/
      if (!value) {
        if (isOnlyChange(trigger)) { callback() } else {
          callback(new Error(msg || '号码不能为空'))
        }
      } else if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入正确的号码'))
      } else {
        callback()
      }
    },

    trigger
  }
}
// 身份证校验
function rule_IdCard(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
      if (!value || value == '') {
        if (isOnlyChange(trigger)) { callback() } else {
          callback(new Error(msg || '身份证号码不能为空'))
        }
      } else if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    },
    trigger
  }
}

// 邮箱校验
function rule_email(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!value || value.length == 0) {
        callback(new Error(msg || '请输入邮箱'))
      } else if (value.length > 0 && !reg.test(value)) {
        callback(new Error(msg || '请输入正确的邮箱地址'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 统一社会信用代码
function rule_creditCode(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/
      if (value.length > 0 && !reg.test(value)) {
        callback(new Error(msg || '请输入正确的统一社会信用代码'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 纬度检验
function rule_lat(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error(msg))
      } else if (value < -90 || value > 90) {
        callback(new Error('请输入正确的的纬度(-90~90)'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 经度校验
function rule_lng(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error(msg))
      } else if (value < -180 || value > 180) {
        callback(new Error('请输入正确的的经度(-180~180)'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 真实姓名校验(不能为空)
function rule_name(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^(?=.{2,10}$)(((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*)$/
      if (!value) {
        callback(new Error(msg || '内容不能为空'))
      } else if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入2-10个汉字'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 身份证校验(可以为空)
function rule_IdCard_enable_empty(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
      if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 校验日期
function isdate(str) {
  var result = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
  if (result == null) return false
  var d = new Date(result[1], result[3] - 1, result[4])
  return (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4])
}
// 校验编号（数字和字母和特殊字符）
function rule_no(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^((?=.*[a-z])+|(?=.*[A-Z])+|(?=.*[!@#$%^&*])+|[0-9!@#$%^&*]+)(?=.*[0-9])+|$/
      if (value.length > 0 && !reg.test(value)) {
        callback(new Error('由数字或字母或特殊符号组成'))
      } else if (value.length == 0) {
        callback(new Error('该参数是必填项'))
      } else {
        callback()
      }
    },
    trigger
  }
}
// 校验名称
function rule_wname(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]/
      if (value.length > 0 && !reg.test(value)) {
        callback(new Error('请输入名称，有中文或英文或数字组成'))
      } else if (value.length == 0) {
        callback(new Error(msg))
      } else {
        callback()
      }
    },
    trigger
  }
}

// 校验工号（数字和字母和特殊字符）
function rule_job_number(msg, trigger) {
  return {
    validator: (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/
      if (value.length > 0 && !reg.test(value)) {
        callback(new Error('匹配全数字或全字母,或数字和字母组合'))
      } else if (value.length == 0) {
        callback(new Error('该参数是必填项'))
      } else {
        callback()
      }
    },
    trigger
  }
}
module.exports = {
  rule_common,
  rule_number,
  rule_username,
  rule_phone,
  rule_IdCard,
  rule_email,
  rule_creditCode,
  rule_lat,
  rule_lng,
  rule_name,
  rule_IdCard_enable_empty,
  rule_age,
  isdate,
  rule_no,
  rule_wname,
  rule_job_number
}
