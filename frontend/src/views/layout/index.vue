<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="!isInstrumentOnlyPreview && device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!isSubApp && !isInstrumentOnlyPreview" class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container" :style="isSubApp || isInstrumentOnlyPreview ? 'margin-left:0px' : ''">
      <div v-if="!isSubApp && !isInstrumentOnlyPreview">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main :class="[!isNotAppletENV ? 'appNotAppletENV' : '', { 'instrument-only-app-main': isInstrumentOnlyPreview }]" />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      isNotAppletENV: state => state.settings.isNotAppletENV
    }),
    classObj() {
      return {
        hideSidebar: this.isNotAppletENV ? !this.sidebar.opened : true,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.isNotAppletENV ? this.device === 'mobile' : true
      }
    },
    isSubApp() {
      return window.__POWERED_BY_QIANKUN__
    },
    isInstrumentOnlyPreview() {
      return process.env.VUE_APP_LOCAL_SOURCE_PREVIEW === 'true'
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    // position: relative;
    height: 100%;
    width: 100%;

    // &.mobile.openSidebar {
    //   position: fixed;
    //   top: 0;
    // }
  }

  .instrument-only-app-main {
    height: 100vh;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
