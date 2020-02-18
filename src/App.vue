<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-format-list-numbered',
          title: 'Leaderboards',
          to: '/leaderboards'
        },
        {
          icon: 'mdi-textbox-password',
          title: 'Change Password',
          to: '/change-password'
        }
        // {
        //   icon: 'mdi-puzzle',
        //   title: 'Mods',
        //   to: '/mods'
        // },
        // {
        //   icon: 'mdi-android',
        //   title: 'Bots',
        //   to: '/bots'
        // },
        // {
        //   icon: 'mdi-console',
        //   title: 'CLI',
        //   to: '/cli'
        // }
      ],
      drawer: false,
      title: 'Screeps Server Dashboard'
    }
  }
}
</script>
