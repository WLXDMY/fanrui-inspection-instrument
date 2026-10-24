<template>
  <div class="action">
    <slot name="buttons" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .action {
    width: 100%;
    padding: 7px 0 9px 16px;
    background: white;
    border-top: 1px solid #c9ced5;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
</style>
