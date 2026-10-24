<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <slot />
    <el-pagination
      v-if="total > 0"
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0px;
  width: calc(100% - 48px);
  background: #fff;
  /* z-index: 3; */
  padding: 16px 0;
  margin: 0;
}
.pagination-container.hidden {
  display: none;
}
::v-deep .el-pagination__total {
  height: 32px !important;
  line-height: 35px !important;
}
::v-deep .el-input--mini {
  margin: 0px !important;
  width: 86px !important;
  height: 32px !important;
}
::v-deep .el-input__inner {
  height: 100% !important;
}
::v-deep .btn-prev {
  margin: 0 !important;
  height: 32px !important;
  margin-right: 10px !important;
}
::v-deep .btn-next {
  margin: 0 !important;
  height: 32px !important;
}

::v-deep .number {
  margin-right: 10px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  line-height: 32px !important;
}
::v-deep .number:first-child {
  margin-left: 0px !important;
}
::v-deep .number:last-child {
  margin-right: 10px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  line-height: 32px !important;
}
::v-deep .el-icon-more {
  margin: 0 10px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  line-height: 32px !important;
}
/* ::v-deep .el-pager {
  padding-bottom: 2px;
} */

::v-deep .el-pagination__jump {
  margin-left: 16px !important;
  height: 32px !important;
  line-height: 32px !important;
}

::v-deep .is-in-pagination {
  width: 56px !important;
  margin: 0 10px !important;
  height: 32px !important;
}
</style>
