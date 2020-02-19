<template>
  <div>
    <v-card v-if="user">
      <v-card-title>
        <img :src="badgeURL" />
        <h1>{{ user.username }}</h1>
      </v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>
    Test {{ $route.params }}
    <div v-if="!loading">{{ user }}</div>
    <div v-if="loading">Loading</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      error: '',
      user: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  computed: {
    badgeURL () {
      const { username } = this.$route.params
      return `/api/user/badge-svg?username=${username}`
    }
  },
  methods: {
    async fetchData () {
      this.loading = true
      const { username } = this.$route.params
      try {
        const { data: { user } } = await this.$axios.get('/api/user/find', { params: { username } })
        this.user = user
      } catch (e) {
        this.error = e.toString()
      }
      this.loading = false
    }
  }
}
</script>
