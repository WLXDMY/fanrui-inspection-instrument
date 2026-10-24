<template>
  <div>
    <div class="userbox">
      <div class="demonstration">基本设置</div>
      <div v-show="isEdit" class="container-user edit">
        <div class="info">
          <el-form
            ref="userInfoForm"
            label-width="140px"
            :rules="formRules"
            :model="userInfoForm"
          >
            <el-form-item label="用户名" prop="username" required>
              <el-input
                v-model="userInfoForm.username"
                placeholder="请输入用户名"
                clearable
                disabled
                size="small"
              />
            </el-form-item>
            <el-form-item label="用户姓名" prop="nickname" required>
              <el-input
                v-model="userInfoForm.nickname"
                placeholder="请输入用户姓名"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userInfoForm.sex">
                <el-radio :label="1">女</el-radio>
                <el-radio :label="2">男</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="userInfoForm.age"
                placeholder="请输入年龄"
                maxlength="3"
                size="small"
              />
            </el-form-item>
            <el-form-item label="用户角色" prop="roleId" required>
              <el-select
                v-model="userInfoForm.roleId"
                placeholder="请选择"
                size="small"
                multiple
              >
                <el-option
                  v-for="(item, index) in roleTypeList"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="电话" prop="mobile" required>
              <el-input
                v-model="userInfoForm.mobile"
                placeholder="请输入电话"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber" clear-validate>
              <el-input
                v-model="userInfoForm.jobNumber"
                placeholder="请输入工号"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="身份证" prop="idCard" clear-validate>
              <el-input
                v-model="userInfoForm.idCard"
                placeholder="请输入身份证"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="微信号" prop="wechat" clear-validate>
              <el-input
                v-model="userInfoForm.wechat"
                placeholder="请输入微信号"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item label="职务" prop="post">
              <el-input
                v-model="userInfoForm.post"
                placeholder="请输入职务"
                clearable
                maxlength="15"
                size="small"
              />
            </el-form-item>
            <el-form-item label="技能等级" prop="skillLevel" clear-validate>
              <el-radio-group v-model="userInfoForm.skillLevel">
                <el-radio :label="1">初级</el-radio>
                <el-radio :label="2">中级</el-radio>
                <el-radio :label="3">高级</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="入职日期" prop="entryDate">
              <el-date-picker
                v-model="userInfoForm.entryDate"
                type="date"
                placeholder="请选择入职日期"
                size="small"
              />
            </el-form-item>
            <el-form-item label="邮箱" prop="email" clear-validate>
              <el-input
                v-model="userInfoForm.email"
                placeholder="请输入邮箱"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="">
              <el-button id="btn-cancel" size="small" @click="isEdit = false">
                取消
              </el-button>
              <el-button type="primary" size="small" @click="UpdateBasicSetup">
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="userimg">
          <el-form
            label-position="top"
            label-width="80px"
            :model="userInfoForm"
            width="148px"
          >
            <el-form-item label="头像">
              <el-image
                :src="`${BASE_URL}/${userInfoForm.headerUrl}`"
                fit="cover"
              />
              <div class="upload-box">
                <el-button size="small">更换头像</el-button>
                <input
                  id="uppic"
                  ref="avatarInput"
                  type="file"
                  name="avatar"
                  class="upload-input"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  title=""
                  @change="changeImage($event)"
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="!isEdit" class="container-user show">
        <div class="info">
          <el-form class="show-form" label-width="140px" :model="showUserInfo">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="showUserInfo.username" readonly size="small" />
            </el-form-item>
            <el-form-item label="用户姓名" prop="nickname">
              <el-input v-model="showUserInfo.nickname" readonly size="small" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-model="showUserInfo.sex" readonly size="small" />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="showUserInfo.age" readonly size="small" />
            </el-form-item>
            <el-form-item label="用户角色" prop="roleName">
              <el-input v-model="showUserInfo.roleName" readonly size="small" />
              <!-- <el-select
                v-model="showUserInfo.roleId"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in roleTypeList"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select> -->
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="showUserInfo.mobile" readonly size="small" />
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber">
              <el-input
                v-model="showUserInfo.jobNumber"
                readonly
                size="small"
              />
            </el-form-item>
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="showUserInfo.idCard" readonly size="small" />
            </el-form-item>
            <el-form-item label="微信号" prop="wechat">
              <el-input v-model="showUserInfo.wechat" readonly size="small" />
            </el-form-item>

            <el-form-item label="职务" prop="post">
              <el-input v-model="showUserInfo.post" readonly size="small" />
            </el-form-item>
            <el-form-item label="技能等级" prop="skillLevel">
              <el-input
                v-model="showUserInfo.skillLevel"
                readonly
                size="small"
              />
            </el-form-item>
            <el-form-item label="入职日期" prop="entryDate">
              <el-input
                v-model="showUserInfo.entryDate"
                readonly
                size="small"
              />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="showUserInfo.email" readonly size="small" />
            </el-form-item>
            <el-form-item label="">
              <el-button
                class="btn-edit"
                type="primary"
                @click="EditBasicSetup"
              >
                编辑基本信息
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="userimg">
          <el-form
            label-position="top"
            label-width="80px"
            :model="showUserInfo"
            width="148px"
          >
            <el-form-item label="头像">
              <el-image
                :src="`${BASE_URL}/${showUserInfo.headerUrl}`"
                fit="cover"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getimgurl, edituser, rolelist, userdetails } from '@/api/base'
import { BASE_URL } from '@/utils/common-variable.js'
import {
  rule_common,
  rule_phone,
  rule_username,
  rule_age,
  rule_email,
  rule_number,
  rule_IdCard
} from '@/utils/formRules'
import moment from 'moment'
import lodash from 'lodash'

export default {
  name: 'BasicSetup',
  components: {},
  props: {},
  data() {
    return {
      BASE_URL,
      showUserInfo: {
        username: '',
        mobile: '',
        nickname: '',
        headerUrl: '',
        email: '',
        idCard: '',
        jobNumber: '',
        roleName: ''
      },
      userInfoForm: {
        username: '',
        mobile: '',
        nickname: '',
        headerUrl: '',
        email: '',
        idCard: '',
        jobNumber: '',
        roleId: []
      },
      InfoEditFile: '',
      //   320311770706001
      // 1352648927@qq.com
      formRules: {
        // age: rule_age('请输入用户年龄', ['change', 'blur']),
        username: rule_username('请输入用户名', ['change', 'blur']),
        nickname: rule_common('请输入用户姓名', ['change', 'blur']),
        mobile: rule_phone('请输入电话', ['change', 'blur']),
        roleId: rule_common('请输入用户角色', ['change', 'blur'])
        // post: rule_common('请填写职务', ['change', 'blur']),
        // jobNumber: rule_number('请输入工号', ['change', 'blur']),
        // entryDate: rule_common('请选择日期', ['change', 'blur']),
        // email: rule_email('请填写邮箱', ['change', 'blur']),
        // sex: rule_common('请选择性别', ['change', 'blur']),
        // idCard: rule_IdCard('请输入身份证', ['change', 'blur'])
      },
      roleTypeList: [],
      isEdit: false
    }
  },
  watch: {},
  mounted() {
    this.getrole()
  },
  methods: {
    userdetails(isEdit = false) {
      userdetails(this.$store.getters.userInfo.id).then(res => {
        if (res.data.code == 200) {
          const tempObj = lodash.cloneDeep(res.data.data)
          const {
            headerUrl,
            username,
            nickname,
            roleId,
            roleName,
            mobile,
            idCard,
            email,
            jobNumber,
            id,
            sex,
            age,
            post,
            skillLevel,
            entryDate,
            wechat,
            departmentId
          } = tempObj
          this.userInfoForm = {
            headerUrl,
            username,
            nickname,
            roleId: roleId?.split(',').map(role => +role) || [],
            roleName,
            mobile,
            idCard,
            email,
            jobNumber,
            id,
            sex,
            age,
            post,
            skillLevel,
            entryDate,
            wechat,
            departmentId
          }
          this.showUserInfo = lodash.cloneDeep(this.userInfoForm)
          this.showUserInfo.sex = this.getSex(sex) || ''
          this.showUserInfo.skillLevel = this.getSkillLevel(skillLevel) || ''
          // if (this.roleTypeList?.length > 0) {
          //   this.showUserInfo.roleId =
          //     this.roleTypeList.filter(
          //       role => (this.showUserInfo.roleId = role.roleName)
          //     )[0]?.roleName || ''
          // }
          this.isEdit = isEdit
          document.getElementById('btn-cancel').blur() // 手动让按钮失焦
        } else {
          this.$notify({
            title: '提示',
            message: res.message || '获取用户信息失败',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    getSex(sex) {
      if (sex === 1) {
        return '女'
      } else if (sex === 2) {
        return '男'
      }
    },
    getSkillLevel(skillLevel) {
      if (skillLevel === 1) {
        return '初级'
      } else if (skillLevel === 2) {
        return '中级'
      } else if (skillLevel === 3) {
        return '高级'
      }
    },
    EditBasicSetup() {
      this.isEdit = true
    },
    UpdateBasicSetup() {
      // console.log(this.userInfoForm, 'userInfoForm')
      this.$refs['userInfoForm'].validate(valid => {
        if (valid) {
          const params = lodash.cloneDeep(this.userInfoForm)
          edituser({
            ...params,
            roleId: this.userInfoForm.roleId.join(','),
            entryDate: moment(params.entryDate).format('YYYY-MM-DD')
          }).then(res => {
            if (res.data.code === '200') {
              this.$notify({
                title: '成功',
                message: '编辑用户信息成功',
                type: 'success',
                duration: 1000
              })
              this.userdetails(false)
            } else {
              this.$notify({
                title: '提示',
                message: res.message || '编辑用户信息失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },
    getrole() {
      const params = {
        current: 1,
        size: 999
      }
      rolelist(params).then(res => {
        this.roleTypeList = []
        res.data.data.records.forEach(role => {
          this.roleTypeList.push({
            roleName: role.name,
            roleId: role.id
          })
          // if (role.id === this.showUserInfo.roleId) {
          //   this.showUserInfo.roleId = role.name
          // }
        })
        // console.log(this.roleTypeList, ' this.roleTypeList')
        this.userdetails()
      })
    },
    //   头像上传start
    changeImage(e) {
      var file = e.target.files[0]
      this.InfoEditFile = file
      if (!file) {
        return
      } else {
        var reader = new FileReader()
        var that = this
        const loading = this.$loading({
          lock: true,
          text: '替换中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        loading.close()
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          that.headerUrl = this.result
          loading.close()
        }
        this.uploadImg(this.InfoEditFile)
      }
    },
    uploadImg(file) {
      const params = new FormData()
      params.append('file', file)
      getimgurl(params).then(res => {
        if (res.data.code === '200') {
          this.userInfoForm.headerUrl = res.data.data.url
        } else {
          this.$notify({
            title: '提示',
            message: res.message || '照片上传失败',
            type: 'success',
            duration: 2000
          })
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
    display: flex;
    .info {
      width: 552px;
      .el-form {
        width: 450px;
        ::v-deep .el-date-editor {
          width: 310px;
        }
        ::v-deep .el-input__inner {
          width: 310px;
        }
      }
    }
    .userimg {
      flex: 1;
      .el-image {
        width: 148px;
        height: 148px;
        border-radius: 50%;
      }
      .upload-box {
        width: 148px;
        text-align: center;
        position: relative;
        .el-button {
          width: 102px;
        }
        .upload-input {
          opacity: 0;
          width: 102px;
          height: 32px;
          position: absolute;
          top: 0;
          left: 23px;
        }
      }
    }
    .el-form-item {
      height: 36px;
    }
  }
}
</style>
