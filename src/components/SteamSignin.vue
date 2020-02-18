<template>
  <div>
    <a href="/api/auth/steam" target="_blank" v-if="!signedIn">
      <img src="@/assets/sits_01.png">
    </a>
    <div v-if="signedIn">
      Signed in via Steam <span v-if="username">as {{ username }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      signedIn: false
    }
  },
  created () {
    window.addEventListener('message', this.handleMessage)
  },
  destroyed () {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    handleMessage (e) {
      if (e.data[0] !== '{') return
      const data = JSON.parse(e.data)
      this.username = data.username
      this.$emit('token', data.token)
      this.signedIn = true
    }
  }
}
</script>
