<template>
  <div v-cloak class="app">
    <vHeader ref="nav" v-if="nav"></vHeader>
    <div class="contains">
      <router-view></router-view>
    </div>
    <vFooter v-if="footer"></vFooter>
    <router-view v-else></router-view>
  </div>
</template>
<script>
  import vHeader from "./components/vheader.vue";
  import vFooter from "./components/vfooter.vue";

  export default {
    name: "App",
    data() {
      return {
        nav: true,
        footer: true,
      };
    },
    provide() {
      return {
        app: this
      };
    },
    components: {
      vHeader,
      vFooter
    },
    created() {
      var vm = this;

    },

    methods: {}
  };
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .app {
    height: 100%;
  }

  .contains {
    min-height: 63.5vh;
  }

  .lang {
    padding-top: 100px;
    min-height: 65.5vh;
  }


</style>
