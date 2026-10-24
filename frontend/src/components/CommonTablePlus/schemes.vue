<template>
  <div class="scheme-container">
    <!-- 方案配置主体部分 -->
    <section class="scheme">
      <div>我的方案:</div>
      <el-tabs v-model="actionName" type="card" style="width: 80%; margin: 0 17px" @tab-click="hdActive">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item.configurationName"
          :name="typeof item.id === 'number' ? String(item.id) : item.id"
        />
      </el-tabs>
      <span v-permission="{ action: permission }">
        <i class="el-icon-setting scheme-icon" @click="hdDialogShow"> 方案配置 </i>
      </span>
    </section>

    <!-- 弹窗部分 -->
    <section>
      <el-dialog :visible.sync="show" :show-close="false" width="600px">
        <div slot="title" class="add">
          <span>配置方案</span>
          <el-button ref="btn" size="small" class="add-new" @click="addScheme"> 新增方案 </el-button>
        </div>
        <el-table
          :data="dialogList"
          highlight-current-row
          class="table"
          :header-cell-style="{
            background: '#F2F5FC',
            color: '#181d1f',
            'font-family': 'Source Han Sans CN',
            'font-size': '13px',
            'font-weight': '550'
          }"
          @current-change="hdSelect"
        >
          <el-table-column label="方案名称">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" v-model="scope.row.configurationName" />
              <span v-else>{{ scope.row.configurationName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="自动进入">
            <template slot-scope="scope">
              <!-- <div>{{ scope.row.isUser }}</div> -->
              <el-checkbox v-model="scope.row.isUser" @change="hdcheckChanged($event, scope.row.id)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <i class="el-icon-edit" style="color: rgb(31, 146, 253)" @click="scope.row.edit = !scope.row.edit" />
              </el-button>
              <el-button type="text" size="small">
                <i class="el-icon-delete" style="color: red" @click="hdDelete(scope.row)" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="check">
          <el-checkbox v-model="isDefault">是否使用默认配置</el-checkbox>
        </div>
        <div slot="footer" class="btn">
          <el-button size="small" @click="show = false">取消</el-button>
          <el-button size="small" type="primary" :disabled="!dialogList.length" @click="hdConfirm"> 确认 </el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import {
  getSchemeList,
  getSchemeconfigList,
  getSpecialConfiguration,
  saveSchemeConfig,
  updateSchemeConfig,
  deleteSchemeConfig
} from '@/api/qualityReport.js'
export default {
  name: 'Schemes',

  props: {
    // 当前页面的配置数据
    defaultConfig: {
      type: Array,
      default: () => []
    },

    // 筛选参数
    parmas: {
      type: Object,
      default: () => {}
    },

    // 前端默认列配置
    orginColumns: {
      type: [Array, Object],
      require: true,
      default: () => []
    },

    // 唯一 code
    modularType: {
      type: String,
      default: ''
    },
    permission: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      // 方案配置弹窗
      show: false,

      // 是否使用默认配置
      isDefault: false,

      // 我的方案 tabs 数据
      list: [],

      // 弹窗数据
      dialogList: [],

      // 点击方案选择的数据
      selected: '',

      // 方案名称
      actionName: '',

      // 用于当作更新列配置的参数
      updateParams: '',

      // 过滤条件
      fliterList: [],

      // 显示过滤弹窗
      showFilter: false
    }
  },

  async created() {
    console.log(this.modularType, 'modularType-sss')
    const schemeVal = sessionStorage.getItem('schemeVal')
    if (schemeVal && sessionStorage.getItem('conditions')) {
      await this.getSchemeList()
      this.initActive(JSON.parse(schemeVal).id)
      this.$nextTick(() => {
        this.actionName = String(JSON.parse(schemeVal).id)
      })
      this.$parent.schemeParams = JSON.parse(schemeVal)
    } else {
      // isInit = true是否初始化，作用：保留从编辑返回列表页时，保存方案的搜索数据
      this.updateData(true)
    }
    console.log('schemes permission', this.permission)
  },

  methods: {
    notify(message = '操作成功', type = 'success', duration = 2000) {
      this.$notify({
        title: '提示',
        message,
        type,
        duration
      })
    },

    async hdDialogShow() {
      // 为了确保数据与表数据一致,在操作方案前,必要更新一下方案数据
      await this.getSchemeList()
      this.show = true
    },

    // 获取组件数据  isInit是否初始化，作用：保留从编辑返回列表页时，保存方案的搜索数据
    async updateData(isInit) {
      await this.getSchemeList()
      await this.getSchemeconfigList(isInit)
    },
    // 返回列表保留之前方案
    async initActive(id) {
      // id 不存在是默认方案
      const data = !id || id === 'default' ? undefined : await this.getSpecialConfiguration(id)

      const sendData = {
        config: data?.columnInformation ? JSON.parse(data.columnInformation) : this.orginColumns,
        // 从 sessionStorage 获取筛选条件
        params: this.$getForwardSessionCommon()
      }
      this.$emit('remoteConfig', {
        sendData,
        scheme: data || this.list[0],
        isInit: true
      })

      // new
      this.$emit('update')
    },

    hdcheckChanged(val, id) {
      // console.log('--- ', val, id)
      this.dialogList.forEach(item => {
        if (item.id !== id) {
          item.isUser = false
        }
      })
    },

    // 方案配置 删除已有的方案时触发
    hdDelete(row) {
      const index = this.dialogList.findIndex(i => i === row)
      if (!row.id) {
        this.dialogList.splice(index, 1)
      }
      if (row.id) {
        this.$confirm('是否确认删除方案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteSchemeConfig(row.id)
          this.dialogList.splice(index, 1)
          this.updateData()
        })
      }
    },

    // 方案配置 添加新的方案时触发
    addScheme(event) {
      event.currentTarget.blur()
      const config = this.defaultConfig && this.defaultConfig.length ? this.defaultConfig : this.orginColumns
      const newSchemeConfig = {
        columnConfigurationId: '',
        columnInformation: config,
        columnSearchInformation: JSON.stringify(this.parmas),
        configurationName: '新增方案 ' + (this.dialogList.length + 1),
        edit: true,
        id: '',
        isUser: 0
      }
      this.dialogList.push(newSchemeConfig)
    },

    // 选择方案时触发
    async hdActive(val) {
      // console.log(val, 'val-------------------------')
      const id = this.list[val.index].id
      // id 不存在是默认方案
      const data = !id || id === 'default' ? undefined : await this.getSpecialConfiguration(id)
      console.log('------ data ----- ', data)

      const sendData = {
        config: data?.columnInformation ? JSON.parse(data.columnInformation) : this.orginColumns,
        params: data?.columnSearchInformation && JSON.parse(data.columnSearchInformation)
      }
      console.log('--- sendData --- ', sendData)
      this.$emit('remoteConfig', { sendData, scheme: data || this.list[0] })
      this.$emit('schemes', this.list[val.index])
      sessionStorage.setItem('schemeVal', JSON.stringify(this.list[val.index]))
      // 存储到 sessionStorage
      this.$setForwardSessionCommon(
        JSON.stringify({
          ...JSON.parse(data?.columnSearchInformation || '{}'),
          size: 20,
          current: 1
        })
      )

      // new
      this.$emit('update')
    },

    // 方案配置确认时触发
    async hdConfirm() {
      this.dialogList.forEach(item => {
        item.isUser = Number(item.isUser)
        if (typeof item.columnInformation !== 'string') {
          item.columnInformation = JSON.stringify(item.columnInformation)
        }
      })

      const data = {
        modularType: this.modularType,
        isDefault: Number(this.isDefault),
        columnConfigurationDetailEntities: [...this.dialogList]
      }

      // 不存在数据调用保存接口
      if (this.list && this.list.length <= 1) {
        await this.saveSchemeConfig(data)
        this.show = false
      }

      // 存在数据调用更新接口
      if (this.list && this.list.length > 1) {
        await this.updateSchemeConfig(data)
        this.show = false
      }

      // 请求完成后需要更新一下方案
      this.updateData()
    },

    // 选择方案时触发
    hdSelect(sel) {
      this.selected = sel
    },

    // 查询类配置数据
    async getSchemeList() {
      const [err, res] = await this.$to(getSchemeList({ userName: 'admin', modularType: this.modularType }))

      if (err) {
        console.log('请求错误 < 1 > ', err)
        return
      }

      const {
        data: { code, data }
      } = res

      if (code !== '200') {
        console.log('返回码错误 < 1 >', code)
        return
      }

      if (data) {
        const { isDefault, columnConfigurationDetailEntities: list = [] } = data
        // 保留 data 用于当作更新列配置的参数
        this.updateParams = data

        this.list = list
        this.dialogList = JSON.parse(JSON.stringify(list.map(i => ({ ...i, edit: false, isUser: !!i.isUser }))))
        this.list.unshift({
          columnConfigurationId: '',
          columnInformation: '',
          columnSearchInformation: '',
          configurationName: '默认方案',
          id: 'default',
          isUser: 0
        })
        this.isDefault = !!isDefault
        return
      }

      this.list = [
        {
          columnConfigurationId: '',
          columnInformation: '',
          columnSearchInformation: '',
          configurationName: '默认方案',
          id: 'default',
          isUser: 0
        }
      ]
      this.dialogList = []
    },

    // 进入页面是获取默认的列配置数据
    // isInit是否初始化，作用：保留从编辑返回列表页时，保存方案的搜索数据
    async getSchemeconfigList(isInit) {
      const [err, res] = await this.$to(
        getSchemeconfigList({
          userName: 'admin',
          modularType: this.modularType
        })
      )

      if (err) {
        console.log('请求错误 < 2 > ', err || code)
        return
      }

      const {
        data: { code, data }
      } = res
      if (code !== '200') {
        console.log('返回码错误 < 2 > ', code)
        return
      }

      // 进入页面时判断该进入哪个方案
      this.dialogList.forEach(item => {
        item.isUser = !!item.isUser
        if (item.id === data?.id) {
          this.$nextTick(() => {
            this.actionName = String(data.id)
          })
        }
      })

      if (!data) {
        this.actionName = 'default'
      }

      const sendData = {
        config: data?.columnInformation ? JSON.parse(data.columnInformation) : this.orginColumns,
        params: data?.columnSearchInformation && JSON.parse(data.columnSearchInformation)
      }
      // isInit是否初始化，作用：保留从编辑返回列表页时，保存方案的搜索数据
      this.$emit('remoteConfig', {
        sendData,
        scheme: data || this.list[0],
        isInit
      })

      // 将方案透传到列表组件中
      this.$emit('schemes', data || this.list[0])
    },

    // 获取特定的列配置数据
    async getSpecialConfiguration(id) {
      // 之前的 try catch 结构可以使用 this.$to 来替代,写法更简单
      const [
        err,
        {
          data: { data }
        }
      ] = await this.$to(getSpecialConfiguration(id))
      if (err) {
        console.log('请求错误 < 3 > ', err)
        return
      }
      return data
    },

    // 保存数据
    async saveSchemeConfig(data) {
      const [err, res] = await this.$to(saveSchemeConfig(data))
      if (err) {
        console.log('请求错误 < 4 > ', err)
        return
      }

      const {
        data: { code }
      } = res
      if (code !== '200') {
        console.log('返回码错误 < 4 > ', code)
        return
      }
      this.notify('保存成功')
      // console.log('保存成功 ---', res)
    },

    // 更新数据
    async updateSchemeConfig(data) {
      const params = { ...this.updateParams, ...data }
      const [err, res] = await this.$to(updateSchemeConfig(params))
      if (err) {
        console.log('请求错误 < 5 > ', err)
        return
      }

      const {
        data: { code }
      } = res
      if (code !== '200') {
        console.log('返回码错误 < 5 > ', code)
        return
      }
      this.notify('更新成功')
      // console.log('更新成功 ---', res)
    },

    // 删除方案时触发
    async deleteSchemeConfig(id) {
      const [err, res] = await this.$to(deleteSchemeConfig(id))
      if (err) {
        console.log('请求错误 < 6 > ', err)
        return
      }

      const {
        data: { code }
      } = res
      if (code !== '200') {
        console.log('返回码错误 < 6 > ', code)
        return
      }
      this.notify('删除方案成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-container {
  padding-bottom: 10px;
}
.scheme {
  display: flex;
  align-items: center;
  margin-top: 10px;
  // border-bottom: 1px solid #dfe4ed;
  // font-weight: 600;
  font-size: 14px;
  & > ::v-deep .el-tabs.el-tabs--card.el-tabs--top {
    flex: 1;
  }
  ::v-deep .el-tabs__header.is-top {
    margin: 0;
    border-radius: 3px;
  }
  // ::v-deep .el-tabs__nav-wrap {
  //   overflow: visible;
  // }
  // ::v-deep .el-tabs__nav-scroll {
  //   overflow: visible;
  // }
  & > ::v-deep .el-tabs--card > .el-tabs__header {
    // border-bottom: none;
    .el-tabs__item {
      height: 23px;
      line-height: 23px;
    }
    .el-tabs__item.is-active {
      // border-bottom-color: #ddd;
      border-color: #1890ff;
      border-left-color: #1890ff !important;
      position: relative;
    }
    .el-tabs__item.is-active::after {
      content: '';
      position: absolute;
      width: 15%;
      height: 100%;
      // D:\work\WEB\yelink-qms\src\assets\images\icon\selected.png
      background-image: url('../../assets/images/icon/selected.png');
      // background-image: url('../../assets/images/icon/selected.png');
      background-repeat: no-repeat;
      top: 0px;
      right: -6px;
      z-index: 9999;
    }
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__item:first-child {
      border-left: 1px solid #ddd;
    }
  }
  .scheme-icon {
    cursor: pointer;
    font-size: 14px;
  }
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span {
    font-size: 20px;
  }
}
::v-deep .el-tabs__item.is-top {
  display: inline-block;
  border: 1px solid #ddd;
  margin: 0 4px;
  border-radius: 3px;
}
::v-deep .el-tabs__item {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}
::v-deep .el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  padding: 0 10px;
}
::v-deep .el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(2) {
  padding: 0 10px;
}
::v-deep .el-tabs__nav-next {
  line-height: 32px;
  font-size: 20px;
  display: block;
  width: 15px;
}
::v-deep .el-tabs__nav-prev {
  line-height: 32px;
  font-size: 20px;
  display: block;
  width: 15px;
}
.check {
  margin-top: 12px;
}
.add-new {
  border-radius: 4px !important;
  border-color: #1890ff;
  color: #1890ff;
}
::v-deep .el-input--medium .el-input__inner {
  height: 30px;
  line-height: 30px;
  border-radius: 5px !important;
}
.table {
  max-height: 500px;
  overflow: auto;
}
.fliter {
  color: #1890ff;
  cursor: pointer;
}
</style>
