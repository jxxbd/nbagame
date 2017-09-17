<template>
  <div id="app">
    <div class="nav">
      <router-link class="nav_item" to="/">首页</router-link>
      <router-link class="nav_item" to="/trace">交易</router-link>
      <router-link class="nav_item" to="/game">开始比赛</router-link>
      <router-link class="nav_item" to="/news">新闻</router-link>
      <router-link class="nav_item" to="/team_detail">球队详情</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  a{
    text-decoration: none;
  }
  .nav{
    display: flex;
    background-color: #00CCFF;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
  .nav_item{
    flex: 1;
    color: #fff;
    text-align:center;
  }
  .nav_item.router-link-active{
    color: #E6421A;
  }
</style>
