<template>
  <v-row dense>
    <v-col cols=12>
      <v-card v-if="welcomeText">
        <v-card-text v-html="welcomeText" />
      </v-card>
    </v-col>
    <v-col cols=12 md=6>
      <v-card>
        <v-card-title>
          <v-icon size="64">mdi-speedometer</v-icon>
          <div>
            <div class="caption grey--text text-uppercase">Tick Rate</div>
            <div>
              <span class="display-2 font-weight-black" v-text="ticks.avg"></span>
              <strong>ms</strong>
            </div>
          </div>
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
    </v-col>
    <v-col xs=12 md=6>
      <v-row no-gutters>
        <v-col xs=12 cols=6 class="pr-1 pb-1">
          <v-card>
            <v-card-title>
              <h3 class="headline">Active Users</h3>
            </v-card-title>
            <v-card-text class="display-1 text-md-center" v-text="stats.activeUsers || '-'"/>
          </v-card>
        </v-col>
        <v-col xs=12 cols=6 class="pl-1 pb-1">
          <v-card>
            <v-card-title>
              <h3 class="headline">Owned Rooms</h3>
            </v-card-title>
            <v-card-text class="display-1 text-md-center" v-text="stats.ownedRooms || '-'"/>
          </v-card>
        </v-col>
        <v-col xs=12 cols=6 class="pr-1 pt-1">
          <v-card>
            <v-card-title>
              <h3 class="headline">Creeps</h3>
            </v-card-title>
            <v-card-text class="display-1 text-md-center" v-text="stats.objects && stats.objects.creeps || '-'"/>
          </v-card>
        </v-col>
        <v-col xs=12 cols=6 class="pl-1 pt-1">
          <v-card>
            <v-card-title>
              <h3 class="headline">Active Rooms</h3>
            </v-card-title>
            <v-card-text class="display-1 text-md-center" v-text="stats.activeRooms && `${stats.activeRooms}/${stats.totalRooms}` || '-'"/>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
    ...mapState(['info', 'stats']),
    ticks () {
      let { avg = '-', ticks = [] } = this.stats?.ticks || {}
      ticks.reverse()
      avg = Math.round(avg) || '-'
      return { avg, ticks }
    },
    welcomeText () {
      let text = this.info?.serverData?.welcomeText || ''
      text = text.replace(/href=".+?authmod.+?"/, 'href="change-password"')
      return text
    }
  },
  destroy () {
  },
  methods: {
  }
}
</script>
