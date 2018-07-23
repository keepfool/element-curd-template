<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      className: `${this.classPrefix}-c-page`
    }
  }
}
</script>
<style lang="less">
  .@{classPrefix}-c-page {
    min-height: 300px;
    padding: 2em;
  }
</style>
