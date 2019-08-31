<template>
  <div class="filmlist">
    <div class="title"><span v-if="cinemalist.length>1">选择</span> 影院类型</div>
    <div class="index_start">
      <div class="item" v-for="(item,index) in cinemalist" @click="go_start(item.cinema_id,item.cinema_name)">
        <img :src="item.cinema_id==1?bg1:flimbgxk" alt="">
        <span>{{item.cinema_name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import bg1 from '../../img/film/flim_bg.png'
  import flimbgxk from '../../img/film/flimbgxk.png'

  export default {
    name: "film_index",
    data() {
      return {
        cinemalist: [],
        bg1: bg1,
        flimbgxk: flimbgxk
      };
    },
    created() {
      this.ge_CinemaList();
      localStorage.removeItem('film_post');
      localStorage.removeItem('qfilm_post')
    },
    components: {},
    methods: {
      // 获取影院列表
      ge_CinemaList() {
        this.$api.CinemaList().then(res => {
          this.cinemalist = res.data;
        });
      },
      go_start(id, name) {
        var cinema_type = id == 1 ? 'yy' : 'xk';
        this.$router.push({path: '/film/film_scene_start', query: {cinema_type: cinema_type, cinema_name: name}})
      }
    }
  };

</script>
<style lang="scss" scoped>
  .filmlist {
    display: flex;
    flex-direction: column;
    /*height: calc(100vh - 60px)*/
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    /*position: fixed;*/
    /*left: 15px;*/
    /*top: 80px;*/
    padding: 15px;
    flex-shrink: 0;
  }

  .index_start {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /*position: fixed;*/
    /*height: 100%;*/
    /*z-index: 1;*/
    /*left: 0;*/
    /*top: 0;*/
    width: 100%;
    /*padding: 50px 0 0 0;*/

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 94%;
      margin-bottom: 32px;
      min-height: 211px;
      height: 211px;
      background-color: rgba(0, 0, 0, .1);
      border-radius: 10px;

      img {
        width: 100%;
      }

      span {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        font-weight: bold;
        color: #fff;
      }

      &:active {
        opacity: .7;
      }
    }
  }
</style>
