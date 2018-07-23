<template>
  <div id="app">
    <Header></Header>
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
  }
}
</script>

<style>
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
</style>
