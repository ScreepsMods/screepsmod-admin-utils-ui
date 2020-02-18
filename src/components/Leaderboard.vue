<template>
  <div>
    <table class="leaderboard__table">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th v-text="label" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in users" :key="user.id">
          <td v-text="index + 1" />
          <td v-text="user.username" />
          <td v-text="user[field]" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['users', 'label', 'field']
}
</script>
<style lang="scss">
.leaderboard {
  &__table {
    width: 100%;
  }
}
</style>
