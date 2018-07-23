<template>
  <div :class="className">
    <h2>基于ElementUI的CURD模板</h2>
    <ul>
      <li>支持列表分页、查询</li>
      <li>支持新建数据操作</li>
      <li>支持单行数据操作（编辑、删除）</li>
      <li>支持批量数据操作（删除）</li>
    </ul>
  </div>
</template>
<script>

export default {
  data () {
    return {
      className: `${this.classPrefix}-v-dashboard`
    }
  }
}
</script>
<style lang="less">
  .@{classPrefix}-v-dashboard {
    li {
      line-height: 2;
    }
  }
</style>
