<template>
  <div>
    <template v-if="multiple">
      <div class="thumbnail-wrapper">
        <el-badge
          v-for="(imgSrc,i) in displaySrcList"
          :key="i"
          :value="(i<limit-1||realSrcList?.length<=limit)?undefined:realSrcList?.length-limit"
          class="item"
        >
          <el-image
            :src="`${imgSrc}`"
            fit="cover"
            :style="`width:${realWidth};height:${realHeight};margin-right:5px`"
            :preview-src-list="realSrcList"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </el-badge>
      </div>
    </template>
    <el-image
      v-else
      :src="`${realSrc}`"
      fit="cover"
      :style="`width:${realWidth};height:${realHeight};`"
      :preview-src-list="realSrcList"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline" />
      </div>
    </el-image>
  </div>

</template>

<script>
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
const BASE = process.env.VUE_APP_BASE_API || ''
export default {
  name: 'ImagePreview',
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      limit: 3
    }
  },
  computed: {
    realSrc() {
      if (!this.src) {
        return
      }
      const real_src = this.src.split(',')[0]
      if (isExternal(real_src)) {
        return real_src
      }
      return BASE + '/' + real_src
    },
    realSrcList() {
      if (!this.src) {
        return
      }
      const real_src_list = this.src.split(',')
      const srcList = []
      real_src_list.forEach(item => {
        if (isExternal(item)) {
          return srcList.push(item)
        }
        return srcList.push(BASE + '/' + item)
      })
      return srcList
    },
    realWidth() {
      return typeof this.width === 'string' ? this.width : `${this.width}px`
    },
    realHeight() {
      return typeof this.height === 'string' ? this.height : `${this.height}px`
    },
    displaySrcList() {
      const limit = this.limit
      const res = this.realSrcList?.length > limit ? this.realSrcList.slice(0, limit) : this.realSrcList
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
  border-radius: 5px;
  background-color: #ebeef5;
  box-shadow: 0 0 5px 1px #ccc;
  ::v-deep .el-image__inner {
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
  ::v-deep .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 30px;
  }
}
.thumbnail-wrapper{
  padding: 10px 0 0 0;
  display: flex;
  flex-wrap: wrap;
}
</style>
