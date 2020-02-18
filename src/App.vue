<template>
  <v-app app dark>
    <v-navigation-drawer
      clipped
      fixed
      app
      :value="drawer"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container fill-height class="ma-2">
        <router-view />
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
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
