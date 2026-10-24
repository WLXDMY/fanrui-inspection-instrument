<template>
  <div class="userbox">
    <div class="demonstration">安全设置</div>
    <div class="container-user">
      <el-form
        ref="userInfoForm"
        label-width="140px"
        :rules="formRules"
        :model="userInfoForm"
      >
        <el-form-item label="旧密码" prop="oldPassword" required>
          <el-input
            v-model="userInfoForm.oldPassword"
            placeholder="请输入旧密码"
            show-user-info-form
            clearable
            size="small"
            type="password"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" required>
          <el-input
            v-model="userInfoForm.newPassword"
            placeholder="请输入新密码"
            show-user-info-form
            clearable
            size="small"
            type="password"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" required>
          <el-input
            v-model="userInfoForm.confirmPassword"
            placeholder="请确认新密码"
            show-user-info-form
            clearable
            size="small"
            type="password"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="UpdatePassword('userInfoForm')">
            修改密码
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changepassword } from '@/api/base'
import { rule_common } from '@/utils/formRules'
import lodash from 'lodash'
export default {
  name: 'SecuritySettings',
  props: {},
  data() {
    return {
      userInfoForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        oldPassword: rule_common('请输入旧密码', ['change', 'blur']),
        newPassword: rule_common('请输入新密码', ['change', 'blur']),
        confirmPassword: rule_common('请确认新密码', ['change', 'blur'])
      }
    }
  },
  mounted() {},
  methods: {
    UpdatePassword(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (
            this.userInfoForm.newPassword === this.userInfoForm.confirmPassword
          ) {
            const params = lodash.cloneDeep(this.userInfoForm)
            delete params.confirmPassword
            changepassword(params).then(res => {
              if (res.data.code == 200) {
                this.$refs[formName].resetFields()
                this.$notify({
                  title: '提示',
                  message: res.message || '修改密码成功',
                  type: 'success',
                  duration: 2000
                })
                // 清理数据
                this.$store.dispatch('user/logout')
                // this.$store.commit('permission/FRONT_ROUTES', [])
                this.$router.push('/genieos/login')
              } else {
                this.$notify({
                  title: '提示',
                  message: res.message || '修改密码失败',
                  type: 'error',
                  duration: 2000
                })
              }
            })
          } else {
            this.$notify({
              title: '提示',
              message: '新密码与确认密码不一致',
              offset: 80,
              type: 'warning',
              duration: 2000
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userbox {
  background-color: #fff;
  padding: 7px 0px 24px 40px;
  height: 100%;

  .demonstration {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.85);
    opacity: 1;
    margin-bottom: 33px;
  }
  .container-user {
    .el-form {
      width: 450px;
    }
  }
}
</style>
