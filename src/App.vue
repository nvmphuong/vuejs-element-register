<template>
  <div id="app">
    <RegisterPage />
  </div>
</template>

<script>
import RegisterPage from './pages/register'

export default {
  name: `app`,
  components: {
      RegisterPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
