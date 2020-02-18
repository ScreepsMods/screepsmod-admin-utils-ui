<template>
  <v-layout
    row
  >
    <v-flex
      xs12
      sm8
      md6
      pa-1
      _class="fill-height"
    >
      <v-card>
        <v-card-title>
          <v-icon size="64">mdi-speedometer</v-icon>
          <v-layout column align-start>
            <div class="caption grey--text text-uppercase">Tick Rate</div>
            <div>
              <span class="display-2 font-weight-black" v-text="ticks.avg"></span>
              <strong>ms</strong>
            </div>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-sparkline
            :key="String(ticks.avg)"
            :value="ticks.ticks"
            smooth="16"
            line-width="3"
            color="white"
            stroke-linecap="round"
            />
        </v-card-text>
      </v-card>
    </v-flex>
    <v-layout row wrap md6>
      <v-flex md6 pa-1>
        <v-card>
          <v-card-title>
            <h3 class="headline">Active Users</h3>
          </v-card-title>
          <v-card-text class="display-1 text-md-center" v-text="stats.activeUsers || '-'"/>
        </v-card>
      </v-flex>
      <v-flex md6 pa-1>
        <v-card>
          <v-card-title>
            <h3 class="headline">Owned Rooms</h3>
          </v-card-title>
          <v-card-text class="display-1 text-md-center" v-text="stats.ownedRooms || '-'"/>
        </v-card>
      </v-flex>
      <v-flex md6 pa-1>
        <v-card>
          <v-card-title>
            <h3 class="headline">Creeps</h3>
          </v-card-title>
          <v-card-text class="display-1 text-md-center" v-text="stats.objects && stats.objects.creeps || '-'"/>
        </v-card>
      </v-flex>
      <v-flex md6 pa-1>
        <v-card>
          <v-card-title>
            <h3 class="headline">Active Rooms</h3>
          </v-card-title>
          <v-card-text class="display-1 text-md-center" v-text="stats.activeRooms && `${stats.activeRooms}/${stats.totalRooms}` || '-'"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      timer: 0
    }
  },
  computed: {
    ...mapState(['stats']),
    ticks () {
      let { avg = '-', ticks = [] } = this.stats?.ticks || {}
      ticks.reverse()
      avg = Math.round(avg) || '-'
      return { avg, ticks }
    }
  },
  destroy () {
  },
  methods: {
  }
}
</script>
