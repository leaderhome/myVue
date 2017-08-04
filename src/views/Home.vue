<template>
  <section>
    <headerTop>
      <span slot="text">首页</span>
    </headerTop>
    <div class="content">Content {{content}}</div>
    <div class="toAbout" @click="toAbout">进入About页面</div>
    <button class="btnModal" @click="viewDialog">模态框</button>
  </section>
</template>

<script>
import headerTop from '../components/Header.vue'
export default {
  data () {
    return {
      content: '内容',
      test: 'ES6模板'
    }
  },
  components: {
    'headerTop': headerTop
  },
  methods: {
    toAbout () {
      this.$router.push('About');
    },
    viewDialog () {
      var vm = this;
      myObj.dialog({
        title: '提示标题',
        content: `<div>提示信息html代码~~~
          <br>${vm.test}
        </div>`, //ES6写法，html模板
        callback: function() {}
      });
    }
  }
}
</script>

<style scoped>
.content {
  font-size: 16px;
  color: #666;
  margin: 10px;
}
.toAbout {
  height: 44px;
  line-height: 42px;
  border: 1px solid #dfdfdf;
  font-size: 18px;
  color: #333;
  background-color: #f5f5f5;
  text-align: center;
  margin: 10px;
}
.btnModal {
  display: inline-block;
  height: 28px;
  line-height: 26px;
  padding: 0 15px;
  border: 1px solid #dfdfdf;
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333;
  margin: 10px;
}
</style>
