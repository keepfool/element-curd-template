<template>
  <div :class="className">
    MIT Licensed | Copyright © {{ year }}-present keepfool
  </div>
</template>
<script>
export default {
  data () {
    return {
      className: `${this.classPrefix}-c-footer`,
      year: new Date().getFullYear()
    }
  }
}
</script>
<style lang="less">

.@{classPrefix}-c-footer {
  .mix-flex-center();
  padding: 2em;
  border-top: 1px solid #eee;
}
</style>
