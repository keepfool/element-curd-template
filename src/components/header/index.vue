<template>
  <div :class="className">
    <ul :class="[`${className}-left`]">
      <li v-for="(link, index) in navs" :key="index" :class="{ active: link.active }">
        <router-link :to="{ path: link.path }">
          {{ link.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      className: `${this.classPrefix}-c-header`
    }
  },
  computed: {
    navs () {
      return this.$store.state.app.navs
    }
  }
}
</script>
<style lang="less">
@height: 50px;

.@{classPrefix}-c-header {
  .mix-clearfix();

  ul {
    list-style: none;
    .mix-clearfix();
  }

  li {
    float: left;
    height: @height;
    line-height: @height;
    cursor: pointer;
  }

  a {
    display: block;
    transition: all .2s ease-in-out;
  }
}

.@{classPrefix}-c-header-left {
  float: left;

  li a {
    padding: 0 1.5em;
    color: #333;
    text-decoration: none;
  }

  li.active a {
    color: #fff;
    border-radius: 3px;
    background-color: @primaryColor;
  }
}
</style>
