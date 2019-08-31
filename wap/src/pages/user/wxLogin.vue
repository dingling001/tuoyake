<template>
  <div class="login"></div>
</template>
<script>
import checkPhone from "@/bin/common";
export default {
  name: "wxLogin",
  data() {
    return {};
  },
  created() {
    let api_token = checkPhone.getCookie("hb_api_token");
    if (api_token != "") {
      localStorage.app_token = api_token;
      if(localStorage.url){
        window.location.href=localStorage.url;
        return false;
      }
      let redirect = decodeURIComponent(this.$route.query.redirect || "/");
      this.$router.replace({ path: redirect });
    } else {
      var redirect = this.$route.query.redirect;
      this.$router.push({ path: "/login", query: { redirect: redirect } });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  padding-top: 90px;
}
</style>
