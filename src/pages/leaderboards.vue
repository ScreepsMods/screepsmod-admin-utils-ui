<template>
  <v-layout
    row
  >
    <v-flex md12>
      <v-tabs
        v-model="currentTab"
        >
        <v-tabs-slider />
        <v-tab v-for="tab in tabs" :key="tab.field" :href="`#tab-${tab.field}`">
          {{ tab.label }}
        </v-tab>
        <v-tab-item v-for="tab in tabs" :key="tab.field" :value="`tab-${tab.field}`">
          <v-card flat tile>
            <v-card-text class="display-1 text-md-center">
              <Leaderboard :users="tab.fn(users)" :label="tab.label" :field="tab.field" />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>
<script>
import Leaderboard from '@/components/Leaderboard'
import { mapState } from 'vuex'
import * as R from 'ramda'

const roomsProp = R.prop('rooms')
const powerProp = R.prop('power')
const gclProp = R.prop('gcl')
const combinedRclProp = R.prop('combinedRCL')

const filterNPCUsers = R.filter(R.compose(R.not, R.includes(R.__, ['2', '3']), R.prop('id')))

const gtZero = n => n > 0
const filterZero = prop => R.filter(R.compose(gtZero, prop))
const sortDescProp = prop => R.sortWith([R.descend(prop)])
const filterSortProp = prop => R.compose(filterZero(prop), sortDescProp(prop))

const sortByRooms = filterSortProp(roomsProp)
const sortByPower = filterSortProp(powerProp)
const sortByGCL = filterSortProp(gclProp)
const sortByCombinedRcl = filterSortProp(combinedRclProp)

export default {
  components: {
    Leaderboard
  },
  data () {
    return {
      currentTab: 'gcl',
      tabs: [
        { label: 'GCL', field: 'gclLevel', fn: sortByGCL },
        { label: 'Power', field: 'powerLevel', fn: sortByPower },
        { label: 'Rooms', field: 'rooms', fn: sortByRooms },
        { label: 'Comb. RCL', field: 'combinedRCL', fn: sortByCombinedRcl }
      ]
    }
  },
  computed: {
    ...mapState(['stats']),
    ticks () {
      let { avg = '-', ticks = [] } = this.stats?.ticks || {}
      ticks.reverse()
      avg = Math.round(avg) || '-'
      return { avg, ticks }
    },
    users () {
      return filterNPCUsers(this.stats?.users || [])
    },
    usersByRooms () { return sortByRooms(this.users) },
    usersByPower () { return sortByPower(this.users) },
    usersByGCL () { return sortByGCL(this.users) },
    usersByCombinedRCL () { return sortByCombinedRcl(this.users) }
  }
}
</script>
