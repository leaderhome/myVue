<template>
  <section>
    <headerTop>
      <span slot="text">About页面</span>
    </headerTop>
    <div class="content">Content {{content}}</div>
    <div class="toHome" @click="toHome">进入Home页面</div>
  </section>
</template>

<script>
import headerTop from '../components/Header.vue'
export default {
  data () {
    return {
      content: '内容'
    }
  },
  components: {
    'headerTop': headerTop
  },
  methods: {
    toHome () {
      this.$router.push({name: 'home'});
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
.toHome {
  height: 44px;
  line-height: 42px;
  border: 1px solid #dfdfdf;
  font-size: 18px;
  color: #333;
  background-color: #f5f5f5;
  text-align: center;
  margin: 10px;
}
</style>
