<!--
 * @Author: dingfei dingf@yelinked.com
 * @Date: 2024-06-04 14:29:16
 * @LastEditors: laidz laidz@yelinked.com
 * @LastEditTime: 2025-05-13 17:52:14
 * @FilePath: \yelink-qms\src\views\quality_management\inspectionProgram\components\tabPages\inspectionItems.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="inspectionItems">
    <section class="centerArea">
      <div class="level" style="margin-bottom: 8px;">
        <el-dropdown v-if="!isDetailType">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            :disabled="initStatus === 1 || isDetailType"
            style="margin-right: 10px;"
          >
            添加检验项<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                :disabled="initStatus === 1 || isDetailType"
                @click="showTransfer"
              >选择检验项目</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                :disabled="initStatus === 1 || isDetailType"
                @click="inspectionProjectAddShow = true"
              >新增检验项目</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          v-if="currentDataList.length && !isDetailType"
          :disabled="initStatus === 1"
          size="mini"
          :type="isDrag ? 'warning' : 'primary'"
          @click="changeOrder"
        >
          {{ isDrag ? '保存调整顺序' : '调整检验顺序' }}
        </el-button>
        <el-button
          v-if="!isDetailType"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="initStatus === 1"
          @click="handleDeleteInspectionItem()"
        >
          删除
        </el-button>
      </div>
      <newMaterialTable
        ref="newMaterialTableRef"
        :table-data="currentDataList"
        :current-row.sync="currentRow"
        :is-drag="isDrag"
        :init-status="initStatus"
        :multiple-defect.sync="multipleDefect"
      >
        <!--重点检查-->
        <template #importantInspection="{ row }">
          <el-checkbox
            v-model="row.importantInspection"
            :disabled="isDetailType || initStatus === 1"
            @change="handleImportantInspectionCheck(['importantInspection'])"
          />
        </template>
        <!--是否必填-->
        <template #required="{ row }">
          <el-checkbox
            v-model="row.required"
            :disabled="isDetailType || initStatus === 1"
            @change="handleImportantInspectionCheck(['required'])"
          />
        </template>
        <!-- 缺陷等级 -->
        <template #defectLevel="{ row }">
          <el-select
            v-model="row.defectLevel"
            placeholder="请选择"
            :disabled="isDetailType || initStatus === 1"
            clearable
          >
            <el-option v-for="(item, index) in defectLevelEnums" :key="index" :label="item.name" :value="item.code" />
          </el-select>
        </template>
        <!--记录样本检验值-->
        <template #recordInspectionValue="{ row }">
          <el-checkbox
            v-model="row.recordInspectionValue"
            :disabled="isDetailType || initStatus === 1"
            @change="handleImportantInspectionCheck(['recordInspectionValue'])"
          />
        </template>
        <!--最少样本数-->
        <template #minQuality="{ row }">
          <el-input
            v-model="row.minQuality"
            placeholder="请输入"
            size="small"
            :disabled="isDetailType || initStatus === 1"
          />
        </template>
        <!--默认合格-->
        <template #defaultQualified="{ row }">
          <el-checkbox
            v-model="row.defaultQualified"
            :disabled="isDetailType || initStatus === 1"
            @change="handleImportantInspectionCheck(['defaultQualified'])"
          />
        </template>
        <!--抽样方案-->
        <template #samplePlanId="{ row, $index }">
          <y-complexSelect
            v-model="row.samplePlanName"
            :disabled="initStatus === 1"
            @btnClickCallback="showSamplDialog(row, $index)"
            @selectChange="(e, options) => changeMaterialCode(e, options, $index)"
          />

          <!-- <el-input v-if="isAddType || isEditType" v-model="row.samplePlanName" class="input-with-select" disabled>
            <el-button
              slot="append"
              icon="el-icon-search"
              :disabled="initStatus === 1"
              @click="showSamplDialog(row, $index)"
            />
          </el-input>
          <span v-else>{{ row.samplePlanName ? row.samplePlanName : '' }}</span> -->
        </template>
        <!-- <template #samplePlanId="{ row, $index }">
          <el-input v-if="isAddType || isEditType" v-model="row.samplePlanName" class="input-with-select" disabled>
            <el-button
              slot="append"
              icon="el-icon-search"
              :disabled="initStatus === 1"
              @click="showSamplDialog(row, $index)"
            />
          </el-input>
          <span v-else>{{ row.samplePlanName ? row.samplePlanName : '' }}</span>
        </template> -->
        <template #inspectionMethod="{ row }">
          <el-input v-model="row.inspectionMethod" size="small" />
        </template>
        <template #referenceValue="{ row }">
          <el-input v-model="row.referenceValue" size="small" />
        </template>
        <template #upperLimitValue="{ row }">
          <el-input v-model="row.upperLimitValue" :disabled="row.iptDisabled" size="small" />
        </template>
        <template #downLimitValue="{ row }">
          <el-input v-model="row.downLimitValue" :disabled="row.iptDisabled" size="small" />
        </template>
        <template #operate="{ row, $index }">
          <el-button
            v-if="!isDetailType"
            :disabled="multipleDefect.length === 0 || initStatus === 1"
            type="text"
            style="color: #ff4949"
            @click.stop="handleDeleteInspectionItem(row, $index)"
          >
            删除
          </el-button>
        </template>
      </newMaterialTable>
    </section>

    <!-- 检验项要求 -->
    <ProjectIndicator
      ref="projectIndicatorRef"
      :form-inline.sync="currentRow"
      :table-data="currentDataList"
      :init-status="initStatus"
    />
    <!-- 选择检验项目 -->
    <InspectionItemDialog
      v-if="materialVisible"
      ref="InspectionItemDialog"
      title="选择检验项目"
      :show-selection="true"
      :transfer-value="transferValue"
      :transfer-data="currentDataList"
      :material-dialog-visible="materialVisible"
      :all-data="treeData"
      @cancel="materialVisible = false"
      @confirm="handleConfirm"
    />
    <CommonSelectDialogPlus
      v-if="showDialog"
      title="抽样方案"
      :request-config="{
        url: 'qms/product/v1/sample/planes/list',
        method: 'post'
      }"
      :extra-params="extraParams"
      :column-config="tableColumn"
      :visible="showDialog"
      :append-to-body="true"
      @confirm="handleConfirmSampling"
      @cancel="showDialog = false"
    />

    <el-dialog
      title="批量录入检验项"
      :visible.sync="inspectionProjectAddShow"
      width="90%"
      modal
      :modal-append-to-body="false"
      :append-to-body="true"
      @close="inspectionProjectAddShow = false"
    >
      <inspectionProjectAdd
        ref="inspectionProjectAdd"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="inspectionProjectAddShow = false">取 消</el-button>
        <el-button type="primary" @click="saveInspectionProjectAdd">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { CHECK_STANDARDS_TABLE } from './constant.js'
import { deleteSchemeItem, getDefectEnums, batchSimpleAdd } from '@/api/quality-manage.js'
import inspectionProjectAdd from '@/views/quality_management/inspectionSheet/newInspectionSheetPage/tabPages/inspectionItems/inspectionProjectAdd/index.vue'

export default {
  name: 'InspectionItems',
  components: {
    newMaterialTable: () => import('./components/newMaterialTable/index.vue'),
    InspectionItemDialog: () => import('./components/InspectionItemDialog.vue'),
    ProjectIndicator: () => import('./components/projectIndicator.vue'),
    CommonSelectDialogPlus: () => import('@/components/CommonSelectDialogPlus/index.vue'),
    inspectionProjectAdd
  },
  props: {
    formInline: {
      type: Object,
      default: () => {
        return {}
      }
    },
    initStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraParams: { statues: [1], filter: true },
      currentDataList: [],
      isDrag: false,
      materialVisible: false,
      transferValue: [],
      treeData: [],
      currentRow: {},
      tableColumn: CHECK_STANDARDS_TABLE,
      showDialog: false,
      defectLevelEnums: [],
      multipleDefect: [],
      // 添加检验项
      inspectionProjectAddShow: false

    }
  },
  computed: {
    isAddType() {
      return this.$route.name.includes('Add')
    },
    isEditType() {
      return this.$route.name.includes('Edit')
    },
    isDetailType() {
      return this.$route.name.includes('Detail')
    }
  },
  watch: {
    currentRow: {
      handler(val) {},
      immediate: true,
      deep: true
    }
  },
  created() {
    this.getDefectEnums()
  },
  methods: {
    // 缺陷等级
    async getDefectEnums() {
      const result = await getDefectEnums()
      const { data } = result.data || {}
      this.defectLevelEnums = data || []
    },
    // 表格中的单选框选择后 联动表头是否全选中状态
    handleImportantInspectionCheck(arr = []) {
      const obj = {}
      const length = this.currentDataList.length
      for (const i of arr) {
        obj[i] = !!length
      }
      this.currentDataList.forEach(item => {
        for (const i in obj) {
          if (!item[i]) {
            obj[i] = false
          }
        }
      })
      for (const i in obj) {
        if (obj[i]) {
          this.$refs['newMaterialTableRef'][i] = true
        } else {
          this.$refs['newMaterialTableRef'][i] = false
        }
      }
    },
    checkBoxReShow() {
      this.handleImportantInspectionCheck([
        'importantInspection',
        'required',
        'recordInspectionValue',
        'defaultQualified'
      ])
    },
    // 数据回显
    handleEcho(data) {
      this.currentDataList = data.map((item, index) => {
        // 选择弹窗回显
        this.transferValue.push(item.itemId)
        return {
          ...item,
          code: item.itemCode,
          name: item.itemName,
          groupCode: item.itemGroupCode,
          groupId: item.itemGroupId,
          groupName: item.itemGroupName || item.groupName,
          referenceValue: item.itemReferenceValue,
          comparatorCode: item.itemComparator,
          upperLimitValue: item.itemUpperLimitValue,
          downLimitValue: item.itemDownLimitValue,
          samplePlanName: item.samplePlanEntity ? item.samplePlanEntity.name : '',
          isOriginal: true // 已经选择的数据
        }
      })
      if (this.currentDataList.length !== 0) {
        this.checkBoxReShow()
        this.currentRow = this.currentDataList[0]
      }
    },
    showTransfer() {
      this.materialVisible = true
    },
    changeOrder() {
      this.isDrag = !this.isDrag
      console.log(this.currentDataList)
    },

    handleDeleteInspectionItem(row, index) {
      console.log('检验项目删除 multipleDefect', this.multipleDefect)
      console.log('检验项目删除 this.currentDataList', this.currentDataList)

      const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
      console.log('检验项目删除 deleteIds', deleteIds)
      if (this.multipleDefect.length === 0) {
        return this.$notify({
          type: 'warning',
          message: '请先勾选！'
        })
      }

      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 因为newMaterialTable 内部做了排序 所以 row index 和 realIndex **不一定** 是一致的
          // const inspectionId = row.inspectionItemId
          // const realIndex = this.currentDataList.findIndex(item => item.inspectionItemId === inspectionId)
          // console.log('realIndex -> ', index, realIndex)
          // 编辑状态下的删除调取接口
          if (this.isEditType && deleteIds.length > 0) {
            // if (this.isEditType && row.id) {
            // const id = this.currentDataList[index].id

            await deleteSchemeItem(this.formInline.schemeId, deleteIds)

            // await deleteSchemeItem(this.formInline.schemeId, [id])
          }

          // 过滤有id的
          this.currentDataList = this.currentDataList.filter(item => {
            return this.multipleDefect.indexOf(item) === -1
          })
          this.transferValue = this.currentDataList.map(item => {
            return item.itemId
          })
          console.log('检验项目删除 currentDataList', this.currentDataList)
          console.log('检验项目删除 transferValue', this.transferValue)

          // 新增的，未保存的,直接过滤下
          this.multipleDefect.forEach(itemA => {
            // 使用filter方法过滤数组，只保留不匹配的项
            this.currentDataList = this.currentDataList.filter(
              itemB => itemB.name !== itemA.name || itemB.code !== itemA.code
            )
          })
          console.log('删除 新增为保存的项目 234', this.currentDataList)

          // this.currentDataList.splice(index, 1)
          // this.transferValue.splice(index, 1)

          // 下方项目指标也要做对应的删除后的显示处理
          /* if (
            (this.currentRow && this.currentRow.id === row.id && !row.isOriginal) ||
            (this.currentRow && this.currentRow.id === row.itemId && row.isOriginal)
          ) {
            this.currentRow = {}
          } */
          if (this.currentDataList.length !== 0) {
            this.currentRow = this.currentDataList[0]
          } else {
            this.currentRow = {}
          }
          this.checkBoxReShow()
        })
        .catch(() => {})
    },
    // handleDeleteInspectionItem333(row, index) {
    //   console.log('检验项目删除 multipleDefect', this.multipleDefect)
    //   console.log('检验项目删除 this.currentDataList', this.currentDataList)
    //   // 如果是新增的，未保存的

    //   const deleteIds = this.multipleDefect.map(item => item.id).filter(item => !isNaN(item))
    //   console.log('检验项目删除 deleteIds', deleteIds)
    //   if (deleteIds.length === 0) {
    //     return this.$notify({
    //       type: 'warning',
    //       message: '请先勾选！'
    //     })
    //   }

    //   // console.log(row, index)
    //   this.$confirm('是否删除该数据?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(async () => {
    //       // 因为newMaterialTable 内部做了排序 所以 row index 和 realIndex **不一定** 是一致的
    //       const inspectionId = row.inspectionItemId
    //       const realIndex = this.currentDataList.findIndex(item => item.inspectionItemId === inspectionId)
    //       console.log('realIndex -> ', index, realIndex)
    //       // 编辑状态下的删除调取接口
    //       if (this.isEditType && deleteIds.length > 0) {
    //         // if (this.isEditType && row.id) {
    //         // const id = this.currentDataList[index].id

    //         await deleteSchemeItem(this.formInline.schemeId, deleteIds)

    //         // await deleteSchemeItem(this.formInline.schemeId, [id])
    //       }

    //       this.currentDataList = this.currentDataList.filter(item => {
    //         return this.multipleDefect.indexOf(item) === -1
    //       })
    //       this.transferValue = this.currentDataList.map(item => {
    //         return item.itemId
    //       })
    //       console.log('检验项目删除 currentDataList', this.currentDataList)
    //       console.log('检验项目删除 transferValue', this.transferValue)

    //       // this.currentDataList.splice(index, 1)
    //       // this.transferValue.splice(index, 1)

    //       // 下方项目指标也要做对应的删除后的显示处理
    //       /* if (
    //         (this.currentRow && this.currentRow.id === row.id && !row.isOriginal) ||
    //         (this.currentRow && this.currentRow.id === row.itemId && row.isOriginal)
    //       ) {
    //         this.currentRow = {}
    //       } */
    //       if (this.currentDataList.length !== 0) {
    //         this.currentRow = this.currentDataList[0]
    //       } else {
    //         this.currentRow = {}
    //       }
    //       this.checkBoxReShow()
    //     })
    //     .catch(() => {})
    // },
    // handleDeleteInspectionItem222(row, index) {
    //   // console.log(row, index)
    //   this.$confirm('是否删除该数据?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(async () => {
    //       // 因为newMaterialTable 内部做了排序 所以 row index 和 realIndex **不一定** 是一致的
    //       const inspectionId = row.inspectionItemId
    //       const realIndex = this.currentDataList.findIndex(item => item.inspectionItemId === inspectionId)
    //       console.log('realIndex -> ', index, realIndex)
    //       // 编辑状态下的删除调取接口
    //       if (this.isEditType && row.id) {
    //         const id = this.currentDataList[index].id
    //         await deleteSchemeItem(this.formInline.schemeId, [id])
    //       }
    //       this.currentDataList.splice(index, 1)
    //       this.transferValue.splice(index, 1)

    //       // 下方项目指标也要做对应的删除后的显示处理
    //       /* if (
    //         (this.currentRow && this.currentRow.id === row.id && !row.isOriginal) ||
    //         (this.currentRow && this.currentRow.id === row.itemId && row.isOriginal)
    //       ) {
    //         this.currentRow = {}
    //       } */
    //       if (this.currentDataList.length !== 0) {
    //         this.currentRow = this.currentDataList[0]
    //       } else {
    //         this.currentRow = {}
    //       }
    //       this.checkBoxReShow()
    //     })
    //     .catch(() => {})
    // },
    // 弹窗选择回调
    async handleConfirm(selectedIds, selectedRows) {
      console.log('选择检验项目 弹窗选择回调 selectedIds', selectedIds)
      console.log('选择检验项目 弹窗选择回调 selectedRows', selectedRows)
      //  标记需要用接口删除的项目
      const arr = []
      this.currentDataList.forEach(item => {
        const bol = selectedIds.includes(item.itemId)
        if (!bol) {
          if (item.id) {
            // 已存在后端的项目
            arr.push(item.id)
          } else {
            // 新增未保存的项目 标记一下
            item.flagDelete = true
          }
        }
      })
      // 删除 新增为保存的项目
      this.currentDataList = this.currentDataList.filter(item => !item.flagDelete)
      // 删除 已存在后端的项目
      if (arr.length !== 0) {
        await deleteSchemeItem(this.formInline.schemeId, [...arr])
        this.currentDataList = this.currentDataList.filter(item => !arr.includes(item.id))
      }

      // 新增项目
      const ids = this.currentDataList.map(item => item.itemId)
      const newSelectedRows = selectedRows
        .filter(item => !ids.includes(item.id))
        .map(item => {
          // 删除附件id和输入方式id
          item?.itemFileList &&
            item?.itemFileList.forEach(attachment => {
              delete attachment.id
            })
          item?.itemOptionList &&
            item?.itemOptionList.forEach(option => {
              delete option.id
            })
          const obj = {
            ...item,
            // 检验条件
            itemInspectionCondition: item.inspectionCondition,
            itemUpperTolerance: item.upperTolerance,
            itemLowerTolerance: item.lowerTolerance,
            defectLevel: item.defectLevelCode,
            analyzeMethodName: item.analyzeMethodCodeName,
            importantInspection: !!item.importantInspection, // 重点检查数值转布尔
            recordInspectionValue: !!item.recordInspectionValue,
            samplePlanName: item.samplePlanEntity && item.samplePlanEntity.name ? item.samplePlanEntity.name : '',
            required: false, // 是否必填
            defaultQualified: item.defaultQualified || false, // 默认合格
            groupName: item.itemGroupEntity ? item.itemGroupEntity.groupName : item.groupName,
            groupCode: item.itemGroupEntity ? item.itemGroupEntity.groupCode : '',
            itemId: item.id
          }
          delete obj.id
          return obj
        })
      this.currentDataList.push(...newSelectedRows)

      this.transferValue = selectedIds
      this.materialVisible = false
      // 项目指标默认选中第一行
      this.currentRow = this.currentDataList && this.currentDataList.length !== 0 ? this.currentDataList[0] : {}
      this.checkBoxReShow()
    },
    showSamplDialog() {
      this.showDialog = true
    },
    // 抽样方案下拉选择回调
    changeMaterialCode(val, options, index) {
      if (val) {
        const hasItem = options.find(el => el.name === val)
        this.$set(this.currentDataList[index], 'samplePlanId', hasItem.id)
        this.$set(this.currentDataList[index], 'samplePlanName', hasItem.name)
        this.$set(this.currentDataList[index], 'inspectLevel', hasItem.inspectLevel)
        this.$set(this.currentDataList[index], 'inspectLevelName', hasItem.inspectLevelName)
        this.$set(this.currentDataList[index], 'stringency', hasItem.stringency)
        this.$set(this.currentDataList[index], 'stringencyName', hasItem.stringencyName)
        this.$set(this.currentDataList[index], 'aqlValue', hasItem.aqlValue)
        // this.handleConfirmSampling(hasItem)
      } else {
        // 删除则把相应的信息清空
        this.$set(this.currentDataList[index], 'samplePlanId', '')
        this.$set(this.currentDataList[index], 'samplePlanName', '')
        this.$set(this.currentDataList[index], 'inspectLevel', '')
        this.$set(this.currentDataList[index], 'inspectLevelName', '')
        this.$set(this.currentDataList[index], 'stringency', '')
        this.$set(this.currentDataList[index], 'stringencyName', '')
        this.$set(this.currentDataList[index], 'aqlValue', '')
      }
    },
    handleConfirmSampling(row) {
      this.currentRow.samplePlanId = row.id
      this.currentRow.samplePlanName = row.name
      this.currentRow.inspectLevel = row.inspectLevel
      this.currentRow.inspectLevelName = row.inspectLevelName
      this.currentRow.stringency = row.stringency
      this.currentRow.stringencyName = row.stringencyName
      this.currentRow.aqlValue = row.aqlValue
      this.currentRow.sampleType = row.type
      this.showDialog = false
    },
    // 添加检验项 start
    // 检验项目新增
    async saveInspectionProjectAdd() {
      if (this?.$refs?.inspectionProjectAdd?.currentItemRow.itemValues.length === 0) {
        this.$notify({
          title: '提示',
          message: '请添加检验项数据',
          type: 'warning',
          duration: 3000
        })
        return
      }

      // 校验
      try {
        const validateOptions = {
          // 校验的数组
          forms: [
            {
              positionInfo: '检验单信息',
              formEntity: this?.$refs?.inspectionProjectAdd?.$refs?.['form']
            }
          ],
          // 用于展开基本信息或tabs的方法对象（非必传）
          otherFunc: {
            // changeTabs: name => {
            //   this.tabValue = name
            // }
            // expandInfo: () => {
            //   this.$refs.baseForm.isFold = true
            // }
          }
        }
        const result = await this.$validateDialog(validateOptions)
        if (!result) return

        const params = this?.$refs?.inspectionProjectAdd?.currentItemRow.itemValues
        const res = await batchSimpleAdd(params)
        const { status, data } = res.data || {}
        if (status === 1) {
          this.$notify({
            title: '提示',
            message: '新增成功',
            type: 'success',
            duration: 2000
          })

          // 将新增的检验项目添加到检验单中
          const ids = data?.map(item => item.id)
          this.handleConfirm(ids, data)
          console.log('将新增的检验项目添加到检验单中 ids', ids)
          console.log('将新增的检验项目添加到检验单中', data)

          // 清空数据
          this.$set(this.$refs?.inspectionProjectAdd, 'currentItemRow', {})
          this.$set(this.$refs?.inspectionProjectAdd?.currentItemRow, 'itemValues', [])
          this.$set(this.$refs?.inspectionProjectAdd, 'sampleTotalNum', '')
          this.inspectionProjectAddShow = false
        }
      } catch (error) {
        console.log('error submit!!', error)
      }
    }
    // 添加检验项 end

  }
}
</script>

<style lang="scss" scoped>
.inspectionItems {
  .centerArea {
    // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    // border-radius: 4px 4px 4px 4px;
    background: white;
    padding: 12px 0px 9px 18px;
  }
}
// 单选，多选框详情时颜色修改
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: rgb(51, 51, 51);
}
</style>
