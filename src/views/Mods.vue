<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline">Mods</h3>
    </v-card-title>
    <v-list two-line>
      <v-list-item v-for="mod in sortedMods" :key="mod.name">
        <v-list-item-action>
          <v-checkbox v-model="enabledMods" :value="mod.name" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="`${mod.name} - ${mod.publisher.username}`" />
          <v-list-item-sub-title v-text="mod.description" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <pre>
      {{ JSON.stringify(config, null, 2) }}
    </pre>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.asyncData()
  },
  watch: {
    $route: 'asyncData'
  },
  computed: {
    ...mapState(['config', 'mods']),
    sortedMods () {
      const arr = Array.from(this.mods)
      arr.sort((a, b) => a.name > b.name ? 1 : -1)
      return arr
    }
  },
  methods: {
    async asyncData () {
      const store = this.$store
      await Promise.all([
        store.dispatch('getConfig'),
        store.dispatch('getAvailableMods')
      ])
      const enabledMods = store.state.config.mods || []
      return {
        enabledMods
      }
    }
  }
}
</script>
