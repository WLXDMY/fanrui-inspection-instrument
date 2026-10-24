<!--
 * @Author: limengjuan
 * @Date: 2022-05-16 15:17:44
 * @LastEditors: xqm 13697256625@163.com
 * @LastEditTime: 2022-12-16 12:15:53
 * @Description:
-->
<template>
  <div class="video-box" style="height: calc(100% - 58px)">
    <Player :video-url="url" />
  </div>
</template>
<script>
import Player from '@/components/EPlayer/index.vue'
export default {
  name: 'Video2',
  components: {
    Player
  },
  data() {
    return {
      url: ''
    }
  },
  created() {
    this.url = this.$route.query.url
    console.log(this.url)
  }
}

</script>
<style lang="scss" scoped>

</style>
