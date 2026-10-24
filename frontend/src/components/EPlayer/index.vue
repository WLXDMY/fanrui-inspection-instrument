<!--
 * @Author: zhaozhuo
 * @Date: 2022-01-20 15:33:43
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-12-16 12:16:41
 * @Description:
-->
<template>
  <EPlayer
    id="player"
    ref="EPlayer"
    :loading="loading"
    :live="live"
    alt="正在努力加载中..."
    :on-demand="onDemand"
    :autoplay="autoplay"
    :video-url="videoUrl"
    element-loading-text="加载中..."
    element-loading-background="#000"
    :decode-wasm="decodeWasm"
    fluent
    stretch
  />
</template>

<script>
import EPlayer from '@easydarwin/easyplayer'

export default {
  name: 'EasyPlayer',
  components: {
    EPlayer
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    live: {
      type: Boolean,
      default: true
    },
    onDemand: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    decodeWasm: {
      type: Boolean,
      default: true
    },
    videoUrl: {
      type: String,
      default: ''
    }
  },
  beforeDestroy() {
    this.$refs.EPlayer.destroyPlayer()
  }
}
</script>

<style lang="scss" scoped>
#player {
  height: 100%;
}
</style>
