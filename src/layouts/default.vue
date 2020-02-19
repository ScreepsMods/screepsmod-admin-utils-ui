<template>
  <v-app app dark>
   <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in activeMenu"
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
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container fluid class="fill-height">
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      mini: true,
      menu: [
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
          to: '/change-password',
          mod: 'screepsmod-auth'
        }
      ],
      drawer: false,
      title: 'Screeps Server Dashboard'
    }
  },
  computed: {
    ...mapState(['mods']),
    activeMenu () {
      return this.menu.filter(m => !m.mod || this.mods.includes(m.mod))
    }
  }
}
</script>
