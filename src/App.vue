<template>
  <div id="app">
    <Header :navs="navs"></Header>
    <Page>
      <router-view/>
    </Page>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import Page from '@/components/page'
import Footer from '@/components/footer'
export default {
  name: 'App',
  components: {
    Header,
    Page,
    Footer
  },
  computed: {
    navs () {
      return this.$store.state.app.navs
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

h2 {
  margin: 1em 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 10%;
}

.el-row {
  margin-bottom: 1em;
}

.el-form {
  .el-input, .el-select {
    width: 240px;
  }
}

.el-date-editor .el-range-separator {
  padding: 0;
}

.el-date-editor--daterange, .el-date-editor--timerange {
  &.el-input, &.el-input__inner {
    width: 300px;
  }
}

.el-standard-query-form {
  .el-input, .el-select {
    width: 150px;
  }
}
</style>
